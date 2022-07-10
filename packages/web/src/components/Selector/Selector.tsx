export interface SelectorProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: {
    id: string;
    label: string;
  }[];
}

export function Selector(props: SelectorProps): JSX.Element {

  if (!props.label) return <SelectorBox  {...props} />;

  return (
    <div className="flex flex-col justify-center items-start h-max w-full">
      <span className="text-gray-600 text-base h-auto mb-1">
        {props.label}
      </span>
      <SelectorBox  {...props} />
    </div>
  );
}

// Sub components --------------------------------------------------------------

function SelectorBox({ options, ...props }: SelectorProps): JSX.Element {
  return (
    <select
      className="outline-none block border-2 w-full px-2 hover:border-blue-200 tracking-wide text-gray-700 text-xs rounded-md h-10 focus:border-blue-500"
      {...props}
    >
      {options.map(({ label, id }) => <option key={id} value={id}>{label}</option>)}
    </select>
  );
}