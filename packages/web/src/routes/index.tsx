import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard, Login } from '../screens';

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}