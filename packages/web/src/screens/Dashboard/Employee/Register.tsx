import { Button, Input } from '../../../components';
import { Selector } from '../../../components/Selector/Selector';
import { NavBar } from '../../../slices';

export function Register(): JSX.Element {
  return (
    <main className='w-screen h-screen flex flex-row'>
      <NavBar />
      <form className='flex flex-col items-center w-full p-8'>
        <h1 className='text-2xl font-bold p-5'>Register New User</h1>
        <div className='flex flex-col w-full max-w-xl gap-4'>
          <div className='flex flex-row gap-2'>
            <Input label='Personal ID Number (CPF)' />
            <Input label='Full Name' />
          </div>
          <div className='flex flex-row gap-2'>
            <Input label='Email' />
            <Input label='Password' />
            <Input label='Salary' />
          </div>
          <div className='flex flex-row gap-2'>
            <Input label='Street address' />
            <Selector
              label='User type'
              options={[
                { id: "admin", label: "Admin" },
                { id: "employee", label: "Employee" }
              ]}
            />
          </div>
          <div className='flex flex-row gap-2'>
            <Input label='Street number' />
            <Input label='Postal code' />
          </div>
          <Button label='Register' />
        </div>
      </form>
    </main>
  );
}