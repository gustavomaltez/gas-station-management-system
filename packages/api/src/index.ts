import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import express from 'express';

import { routes } from './routes';

// App initialization ----------------------------------------------------------

const app = express();

// App configuration -----------------------------------------------------------

app.use(bodyParser.json());
app.use(routes);

// App launch ------------------------------------------------------------------

app.listen(7520, () => console.log('Listening on port 7520!'));
