import { UserIcon } from '@heroicons/react/solid';

import { NavBar } from '../../components';

export function Dashboard(): JSX.Element {
  return (
    <div>
      <NavBar
        items={[
          { label: "Dashboard", isDivider: true },
          { label: "Statistics", icon: UserIcon, isSelected: true },
          { label: "Fuel", icon: UserIcon },

          { label: "Clients", isDivider: true },
          { label: "Statistics", icon: UserIcon },
          { label: "Register", icon: UserIcon },
          { label: "Edit", icon: UserIcon },

          { label: "Employees", isDivider: true },
          { label: "Statistics", icon: UserIcon },
          { label: "Register", icon: UserIcon },
          { label: "Edit", icon: UserIcon },

          { label: "Finances", isDivider: true },
          { label: "Statistics", icon: UserIcon },
          { label: "Fiscal Notes", icon: UserIcon },
        ]}
      />
    </div>
  );
}