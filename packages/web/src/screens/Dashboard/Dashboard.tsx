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

import { Button, NavBar } from '../../components';
import logo from './logo.png';

export function Dashboard(): JSX.Element {
  return (
    <div>
      <NavBar
        items={[
          { label: "Dashboard", isDivider: true },
          { label: "Statistics", icon: PresentationChartLineIcon, isSelected: true },
          { label: "Fuel", icon: BeakerIcon },

          { label: "Clients", isDivider: true },
          { label: "Register", icon: UserAddIcon },
          { label: "Edit", icon: PencilAltIcon },

          { label: "Employees", isDivider: true },
          { label: "Register", icon: IdentificationIcon },
          { label: "Edit", icon: UserGroupIcon },

          { label: "Finances", isDivider: true },
          { label: "Statistics", icon: ChartPieIcon },
          { label: "Fiscal Notes", icon: DocumentTextIcon },
        ]}
        header={<img src={logo} className="w-20 mx-auto" />}
        footer={<Button label='Logout' />}
      />
    </div>
  );
}