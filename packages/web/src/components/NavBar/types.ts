export interface NavBarItem {
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
   * The path related to the item. If the current path matches this path, the item will be selected.
   */
  path?: string;
}

export interface NavBarProps {
  /**
   * The items to be rendered in the navbar.
   */
  items: NavBarItem[];

  /**
   * A element to be rendered at the top of the navbar.
   */
  header?: JSX.Element;

  /**
   * A element to be rendered at the bottom of the navbar.
   */
  footer?: JSX.Element;
}