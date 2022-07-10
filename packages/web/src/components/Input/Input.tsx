// Types declarations ----------------------------------------------------------

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// Component -------------------------------------------------------------------

export function Input(props: InputProps): JSX.Element {

  if (!props.label) return <InputBox {...props} />;

  return (
    <div className="flex flex-col justify-center items-start h-max">
      <span className="text-gray-600 text-base h-auto mb-1">
        {props.label}
      </span>
      <InputBox {...props} />
    </div>
  );
}

// Sub components --------------------------------------------------------------

function InputBox(props: InputProps): JSX.Element {
  return (
    <input
      className="outline-none block border-2 w-full rounded-lg py-2 px-2 hover:border-blue-200 tracking-wide text-gray-700 text-xs rounded-md"
      type="text"
      {...props}
    />
  );
};

