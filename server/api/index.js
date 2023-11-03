import { Router } from 'express';
import airacFilesApi from './airacFilesApi.js';

const router = Router();

router.use('/api/airac-files', airacFilesApi);

export default router;
