import { Input } from '../../components';
import { Button, ButtonTheme } from '../../components/Button/Button';

export function LoginForm(): JSX.Element {
  return (
    <form className='flex flex-col gap-3 p-4 max-w-lg mx-auto w-full'>
      <Input label="E-mail" />
      <Input label="Password" type="password" />
      <Button label="Login" theme={ButtonTheme.primary} />
    </form>
  );
}
