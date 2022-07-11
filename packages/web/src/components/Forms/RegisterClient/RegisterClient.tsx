import { useForm } from 'react-hook-form';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';

// Types declarations ----------------------------------------------------------

interface RegisterClientProps {
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

export function RegisterClientForm(props: RegisterClientProps): JSX.Element {

  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form className='flex flex-col items-center w-full p-8' onSubmit={handleSubmit(props.onSubmit)}>
      <h1 className='text-2xl font-bold p-5'>Register New Client</h1>
      <div className='flex flex-col w-full max-w-xl gap-4'>
        <div className='flex flex-row gap-2'>
          <Input label='Personal ID Number (CPF)' id='cpf' register={register} />
          <Input label='Full Name' id='name' register={register} />
        </div>
        <div className='flex flex-row gap-2'>
          <Input label='Birth date' id='birth_date' register={register} />
          <Input label='Main phone number' id='main_phone_number' register={register} />
          <Input label='Secondary phone number' id='secondary_phone_number' register={register} />
        </div>
        <Input label='Street address' id='address_street' register={register} />
        <div className='flex flex-row gap-2' >
          <Input label='Street number' id='address_number' register={register} />
          <Input label='Postal code' id='address_postal_code' register={register} />
        </div>
        <Button label={props.submitLabel ?? 'Register'} type='submit' />
      </div>
    </form>
  );
}
