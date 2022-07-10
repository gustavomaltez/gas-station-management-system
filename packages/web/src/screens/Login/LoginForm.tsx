import { Input } from '../../components';
import { Button, ButtonTheme } from '../../components/Button/Button';

export function LoginForm(): JSX.Element {
  return (
    <form className='grid grid-rows-3 gap-4 p-4'>
      <h1>Login</h1>
      <Input label="E-mail" />
      <Input label="Password" />
      <Button label="Login" theme={ButtonTheme.primary} />
      <Button label="Register" theme={ButtonTheme.secondary} />
    </form>
  );
}