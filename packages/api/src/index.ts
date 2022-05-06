import 'express-async-errors';

import bodyParser from 'body-parser';
import express from 'express';

import { initialize as initializeDatabase } from './database/database';
import { routes } from './routes';

// App initialization ----------------------------------------------------------

initializeDatabase();
const app = express();

// App configuration -----------------------------------------------------------

app.use(bodyParser.json());
app.use(routes);

// App launch ------------------------------------------------------------------

app.listen(7520, () => console.log('Listening on port 7520!'));
