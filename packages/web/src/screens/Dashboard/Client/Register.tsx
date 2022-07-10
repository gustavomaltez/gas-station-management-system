import { Button, Input } from '../../../components';
import { NavBar } from '../../../slices';

export function Register(): JSX.Element {
  return (
    <main className='w-screen h-screen flex flex-row'>
      <NavBar />
      <form className='flex flex-col items-center w-full p-8'>
        <h1 className='text-2xl font-bold p-5'>Register New Client</h1>
        <div className='flex flex-col w-full max-w-xl gap-4'>
          <div className='flex flex-row gap-2'>
            <Input label='Personal ID Number (CPF)' />
            <Input label='Full Name' />
          </div>
          <div className='flex flex-row gap-2'>
            <Input label='Birth date' />
            <Input label='Main phone number' />
            <Input label='Secondary phone number' />
          </div>
          <Input label='Street address' />
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