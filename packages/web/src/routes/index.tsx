import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from '../screens';

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}