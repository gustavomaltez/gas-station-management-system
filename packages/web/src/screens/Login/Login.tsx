import image from './illustration.png';
import { LoginForm } from './LoginForm';

export function Login(): JSX.Element {
  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <img src={image} className="px-20 max-w-lg mx-auto" />
      <LoginForm />
    </section>
  );
}
