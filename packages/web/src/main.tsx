import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppRouter } from './routes';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
