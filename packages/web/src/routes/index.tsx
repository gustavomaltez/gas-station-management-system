import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard, Login } from '../screens';

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/statistics" element={<Dashboard.dashboard.statistics />} />
        <Route path="/dashboard/fuel" element={<Dashboard.dashboard.fuel />} />
        <Route path="/dashboard/clients/register" element={<Dashboard.clients.register />} />
        <Route path="/dashboard/clients/edit" element={<Dashboard.clients.edit />} />
        <Route path="/dashboard/employees/register" element={<Dashboard.employees.register />} />
        <Route path="/dashboard/employees/edit" element={<Dashboard.employees.edit />} />
        <Route path="/dashboard/finances/statistics" element={<Dashboard.finances.statistics />} />
        <Route path="/dashboard/finances/invoices" element={<Dashboard.finances.invoices />} />
      </Routes>
    </BrowserRouter>
  );
}