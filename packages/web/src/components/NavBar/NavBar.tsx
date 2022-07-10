// Types declarations ----------------------------------------------------------


interface Item {
  /**
   * Whether the item should be rendered as a divider.
   * 
   * Setting this to true will ignore all the other props.
   * If the item is a divider, it will use the label as the divider text.
   */
  isDivider?: boolean;

  /**
   * The item label or the divider text.
   */
  label: string;

  /**
   * The item icon to be rendered at the left of the text
   */
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;

  /**
   * Callback method to be executed once the item is clicked.
   */
  onClick?: () => void;

  /**
   * Whether the item should be displayed as active.
   */
  isSelected?: boolean;
}

interface NavBarProps {
  items: Item[];
}

export function NavBar(props: NavBarProps): JSX.Element {
  return (
    <nav className="flex flex-col h-screen w-max max-w-sm bg-white border-r-2 border-gray-200 p-2">
      {props.items.map(renderItem)}
    </nav>
  );
}

// Helpers ---------------------------------------------------------------------

function renderItem(item: Item): JSX.Element {
  if (item.isDivider) return <NavBarDivisor label={item.label} />;
  return <NavBarItem {...item} />;
}

// Sub components --------------------------------------------------------------

function NavBarItem(props: Item): JSX.Element {

  function getLabelClassName(): string {
    const defaultClassName = "text-base group-hover:text-blue-400";
    if (!props.isSelected) return `${defaultClassName} text-slate-600`;
    return `${defaultClassName} text-blue-400`;
  }

  function getIconClassName(): string {
    const defaultClassName = "h-6 w-6 group-hover:text-blue-500";
    if (!props.isSelected) return defaultClassName;
    return `${defaultClassName} text-blue-500`;
  }

  const Icon = props.icon;

  return (
    <button className="group flex flex-row gap-2 items-center my-1">
      {!!Icon && <Icon className={getIconClassName()} />}
      <span className={getLabelClassName()}>{props.label}</span>
    </button>
  );
}

function NavBarDivisor(props: Item): JSX.Element {
  return (
    <span className="text-sm text-slate-600 font-bold uppercase">
      {props.label}
    </span>
  );
}
