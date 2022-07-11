import { RegisterEmployeeForm } from '../../../components/Forms/RegisterEmployee/RegisterEmployee';
import { NavBar } from '../../../slices';

export function Register(): JSX.Element {
  return (
    <main className='w-screen h-screen flex flex-row'>
      <NavBar />
      <RegisterEmployeeForm onSubmit={data => console.log(data)} />
    </main>
  );
}