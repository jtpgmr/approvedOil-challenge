import app from './app.js';
import dotenv from 'dotenv';

import connectDb from './utils/connectDb.js';
import log from './utils/log.js';

dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  log.info(`Listening: http://localhost:${port}`);
  connectDb();
});