import { Router } from 'express';
import { Op, col, fn } from 'sequelize';
import { Logger } from '../utils/customLogger.js';
import DbContext from '../core/dbContext.js';
import ofplDownload from '../core/models/ofplDownload.js';
import { ENV } from '../utils/constants.js';
import archiver from 'archiver';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
const _router = Router();
const _dbContext = new DbContext('Falcon');
const _attributes = { attributes: Object.keys(ofplDownload).filter(key => key !== 'data').map(key => key) };

/**
 * Retrieve a list of ofplDownload data based on a given predicate.
 *
 * @param {object} predicate - Sequelize query options for filtering the results.
 * @returns {Promise} - A promise that resolves to an array of ofplDownload.
 */
const findAll = async (predicate) => {
  return await _dbContext.ofplDownloads.findAll({ ..._attributes, ...predicate, });
}

/**
 * Middleware: env Parameter Validation
 * Description: This middleware validates the 'env' parameter in the route.
 * It ensures that 'env' is a valid environment (e.g., 'DEV', 'TEST', 'QA', etc.).
 * If 'env' is valid, it sets the environment in the database context and proceeds to the next middleware.
 * If 'env' is invalid, it responds with a 400 Bad Request and an error message.
 */
_router.param('env', async (req, res, next, env) => {
  // Ensure env is a valid environment (e.g., 'DEV', 'TEST', 'QA', etc.)
  if (Object.values(ENV).includes(env)) {
    // Only changes Environment if it's different from the initialized one
    await _dbContext.setEnvironment(env);
    next();
  } else {
    res.status(400).json({ error: 'Invalid environment' });
  }
});

/**
 * Error Handling Middleware
 * Description: This middleware handles internal server errors.
 * It logs the error using a logger (e.g., Logger.error) and responds with a 500 Internal Server Error along with an error message.
 */
_router.use((err, req, res, next) => {
  Logger.error('Internal server error: ', err);
  res.status(500).json({ error: 'Internal server error' });
});

/**
 * Endpoint: GET /:env/
 * Description: Retrieve a list of downloads based on the specified environment.
 */
_router.get('/:env/', async (req, res, next) => {
  try {
    const downloads = await findAll();
    res.json(downloads);
  } catch (err) {
    next(err);
  }
});

/**
 * Endpoint: GET /:env/active
 * Description: Retrieve a list of active downloads in the specified environment.
 * Active downloads are determined by certain date criteria.
 */
_router.get('/:env/active', async (req, res, next) => {
  try {
    // const today = fn('CONVERT', col('DATETIMEOFFSET'), dayjs().format('MM/DD/YYYY'));

    const activeDownloads = await findAll({
      where: {
        effectiveDtUtc: { [Op.lte]: fn('getdate') },
        expirationDtUtc: { [Op.gt]: fn('getdate') }
      }
    });

    res.json(activeDownloads);
  } catch (err) {
    next(err);
  }
});

/**
 * Endpoint: GET /:env/range
 * Description: Retrieve downloads within a specified date range in the specified environment.
 * It expects 'from' and optional 'to' parameters in the query string to define the date range.
 */
_router.get('/:env/range', async (req, res, next) => {
  try {
    const { from, to = new Date() } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()))
      throw new Error(`Invalid 'from' date: ${from}`);

    if (isNaN(toDate.getTime()))
      throw new Error(`Invalid 'to' date: ${to}`);

    const result = await findAll({
      where: {
        creationDtUtc: {
          [Op.between]: [
            fn('CONVERT', col('DATETIMEOFFSET'), fromDate),
            fn('CONVERT', col('DATETIMEOFFSET'), toDate)
          ],
        },
      }
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * Endpoint: GET /:env/:id
 * Description: Retrieve a specific download with the given 'id' in the specified environment.
 */
_router.get('/:env/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await _dbContext.ofplDownloads.findByPk(id, attributes);

    res.json(result || {});
  } catch (err) {
    next(err);
  }
});

/**
 * Endpoint: POST /:env/download
 * Description: Initiate a download operation. Expects a JSON request body containing 'ids' (an array of download IDs).
 * Retrieves the requested records by its IDs and sends a zip back to the requester.
 */
_router.post('/:env/download', async (req, res, next) => {
  try {
    const { ids } = req.body;
    const { env } = req.params;

    const result = (await _dbContext.ofplDownloads.findAll({
      where: {
        ofplDownloadId: { [Op.in]: ids }
      },
      attributes: ['type', 'data', 'creationDtUtc']
    }))
      .groupBy("type");

    // Set the content-type and content-disposition headers
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${env}.zip"`);

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    // Pipe the archive directly to the response
    archive.pipe(res);

    for (const [type, records] of Object.entries(result)) {
      for (const record of records) {
        const extension = type === 'GEOFIR' ? 'json' : 'zip';
        const extensionPrefix = records.length > 1 ? `_${dayjs(record.creationDtUtc).format('YYYYMMDDThhmmss')}` : '';

        // Append each file to the archive
        const fileName = `${type}${extensionPrefix}.${extension}`;
        archive.append(record.data, { name: fileName });
      }
    }

    // Finalize the archive, which ends the stream
    archive.finalize();
  } catch (err) {
    next(err);
  }
});

export default _router;
