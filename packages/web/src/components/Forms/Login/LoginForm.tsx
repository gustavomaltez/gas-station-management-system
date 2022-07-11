import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme } from '../../Button/Button';
import { Input } from '../../Input/Input';

// Types declarations ----------------------------------------------------------

interface LoginFormProps {
  submitLabel?: string;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  cpf: string;
  name: string;
  birth_date: string;
  main_phone_number: string;
  secondary_phone_number: string;
  address_street: string;
  address_number: string;
  address_postal_code: string;
}

// Component -------------------------------------------------------------------

export function LoginForm(props: LoginFormProps): JSX.Element {

  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form className='flex flex-col gap-3 p-4 max-w-lg mx-auto w-full' onSubmit={handleSubmit(props.onSubmit)}>
      <Input label="E-mail" id="email" register={register} />
      <Input label="Password" type="password" id="password" register={register} />
      <Button label="Login" theme={ButtonTheme.primary} onClick={() => navigateTo('/dashboard/statistics')} />
    </form>
  );
}
