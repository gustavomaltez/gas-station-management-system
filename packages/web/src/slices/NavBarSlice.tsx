import {
  BeakerIcon,
  ChartPieIcon,
  DocumentTextIcon,
  IdentificationIcon,
  PencilAltIcon,
  PresentationChartLineIcon,
  UserAddIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import { Button, NavBar } from '../components';

export function NavBarSlice(): JSX.Element {
  const navigateTo = useNavigate();

  return (
    <NavBar
      items={[
        { label: "Dashboard", isDivider: true },
        { label: "Statistics", icon: PresentationChartLineIcon, path: "/dashboard/statistics" },
        { label: "Fuel", icon: BeakerIcon, path: "/dashboard/fuel" },

        { label: "Clients", isDivider: true },
        { label: "Register", icon: UserAddIcon, path: "/dashboard/clients/register" },
        { label: "Edit", icon: PencilAltIcon, path: "/dashboard/clients/edit" },

        { label: "Employees", isDivider: true },
        { label: "Register", icon: IdentificationIcon, path: "/dashboard/employees/register" },
        { label: "Edit", icon: UserGroupIcon, path: "/dashboard/employees/edit" },

        { label: "Finances", isDivider: true },
        { label: "Statistics", icon: ChartPieIcon, path: "/dashboard/finances/statistics" },
        { label: "Invoices", icon: DocumentTextIcon, path: "/dashboard/finances/invoices" },
      ]}
      header={<img src={logo} className="w-20 mx-auto" />}
      footer={<Button label='Logout' onClick={() => navigateTo('/')} />}
    />
  );
}