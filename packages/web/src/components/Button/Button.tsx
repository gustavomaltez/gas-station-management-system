import { ClassName } from '../../@types';

// Types declarations ----------------------------------------------------------

export enum ButtonTheme {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  label?: string;
  theme?: ButtonTheme;
}

// Component -------------------------------------------------------------------

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className={`${buildClassName(props)} pall`}
      {...props}
    >
      {props.label && <span>{props.label}</span>}
      {props.children}
    </button>
  );
}

// Data ------------------------------------------------------------------------

const defaultClassName: ClassName = 'block w-full text-white text-sm px-5 text-center rounded-lg hover:bg-blue-600 font-medium h-11';
const themes: Record<ButtonTheme, ClassName> = {
  primary: 'bg-blue-500',
  secondary: 'text-blue-500 hover:text-white border border-blue-500',
};

// Helpers ---------------------------------------------------------------------

function buildClassName({ theme = ButtonTheme.primary }: ButtonProps): string {
  return [defaultClassName, themes[theme]].join(' ');
};