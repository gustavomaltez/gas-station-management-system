import image from '../../assets/images/login-illustration.png';
import { LoginForm } from '../../components';

export function Login(): JSX.Element {
  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <img src={image} className="px-20 max-w-lg mx-auto" />
      <LoginForm onSubmit={() => { }} />
    </section>
  );
}
