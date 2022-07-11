import { RegisterClientForm } from '../../../components';
import { NavBar } from '../../../slices';

export function Register(): JSX.Element {
  return (
    <main className='w-screen h-screen flex flex-row'>
      <NavBar />
      <RegisterClientForm onSubmit={data => console.log(data)} />
    </main>
  );
}