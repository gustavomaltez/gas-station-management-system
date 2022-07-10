import { NavBar } from '../../../slices';

export function Invoices(): JSX.Element {
  return (
    <main className='w-screen h-screen flex flex-row'>
      <NavBar />
      <form className='flex flex-col items-center w-full p-8'>
        <h1 className='text-2xl font-bold p-5'>Invoices</h1>
      </form>
    </main>
  );
}