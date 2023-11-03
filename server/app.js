import express from 'express';
import routes from './api/index.js';
import cors from "cors";
import './utils/objectExtensions.js';

const app = express();

// Allow all origins
app.use(cors());

app.use(express.json());
app.use('/', routes);

app.use((err, req, res, next) => {
  res.json(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('\x1b[34m%s\x1b[0m', `Server is running on http://localhost:${port}`));
