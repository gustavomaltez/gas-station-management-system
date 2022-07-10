import { Edit as EditClients } from './Client/Edit';
import { Register as RegisterClients } from './Client/Register';
import { Fuel as DashboardFuel } from './Dashboard/Fuel';
import { Statistics as DashboardStatistics } from './Dashboard/Statistics';
import { Edit as EditEmployee } from './Employee/Edit';
import { Register as RegisterEmployee } from './Employee/Register';
import { Invoices as FinancesInvoices } from './Finances/Invoices';
import { Statistics as FinancesStatistics } from './Finances/Statistics';

export const Dashboard = {
  dashboard: {
    statistics: DashboardStatistics,
    fuel: DashboardFuel,
  },
  clients: {
    register: RegisterClients,
    edit: EditClients
  },
  employees: {
    register: RegisterEmployee,
    edit: EditEmployee
  },
  finances: {
    statistics: FinancesStatistics,
    invoices: FinancesInvoices,
  }
};