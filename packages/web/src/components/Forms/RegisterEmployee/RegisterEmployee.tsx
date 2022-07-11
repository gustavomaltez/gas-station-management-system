import { useForm } from 'react-hook-form';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Selector } from '../../Selector/Selector';

// Types declarations ----------------------------------------------------------

interface RegisterEmployeeProps {
  submitLabel?: string;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  cpf: string;
  name: string;
  email: string;
  password: string;
  userType: 'admin' | 'employee';
  main_phone_number: string;
  secondary_phone_number: string;
  address_street: string;
  address_number: string;
  address_postal_code: string;
}

// Component -------------------------------------------------------------------

export function RegisterEmployeeForm(props: RegisterEmployeeProps): JSX.Element {

  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form className='flex flex-col items-center w-full p-8' onSubmit={handleSubmit(props.onSubmit)}>
      <h1 className='text-2xl font-bold p-5'>Register New User</h1>
      <div className='flex flex-col w-full max-w-xl gap-4'>
        <div className='flex flex-row gap-2'>
          <Input label='Personal ID Number (CPF)' id='cpf' register={register} />
          <Input label='Full Name' id='name' register={register} />
        </div>
        <div className='flex flex-row gap-2'>
          <Input label='Email' id='email' register={register} />
          <Input label='Password' id='password' register={register} />
          <Input label='Salary' id='salary' register={register} />
        </div>
        <div className='flex flex-row gap-2'>
          <Input label='Street address' id='address_street' register={register} />
          <Selector
            label='User type'
            options={[
              { id: "admin", label: "Admin" },
              { id: "employee", label: "Employee" }
            ]}
          />
        </div>
        <div className='flex flex-row gap-2'>
          <Input label='Street number' id='address_number' register={register} />
          <Input label='Postal code' id='address_postal_code' register={register} />
        </div>
        <Button label={props.submitLabel ?? 'Register'} type='submit' />
      </div>
    </form>
  );
}
