// Vital Imports ---------------------------------------------------------------

import 'reflect-metadata';
import 'express-async-errors';

// Code Imports ----------------------------------------------------------------

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
