import { Input } from '../../../components';
import { NavBar } from '../../../slices';

export function Edit(): JSX.Element {
  return (
    <main className='w-screen h-screen flex flex-row'>
      <NavBar />
      <section className='p-4'>
        <Input label='test' />
      </section>
    </main>
  );
}