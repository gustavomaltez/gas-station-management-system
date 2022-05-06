import express from 'express';
import { initialize as initializeDatabase } from './database/database';
import { authenticationRouter } from './routes/authentication.route';
import bodyParser from 'body-parser';

initializeDatabase();
const app = express();
app.use(bodyParser.json());
app.use('/auth', authenticationRouter);
app.listen(7520, () => console.log('Listening on port 7520!'));
