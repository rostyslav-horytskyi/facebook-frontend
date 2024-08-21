import './Login.scss';
import LoginForm from './components/LoginForm/LoginForm';
import LoginFooter from './components/LoginFooter/LoginFooter';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { block } from '../../helpers/bem.helpers';
import { LoginProvider } from './Login.context';

const b = block('Login');

export const Login = () => (
  <div className={b('')}>
    <div className={b('wrapper')}>
      <LoginProvider>
        <LoginForm />
        <RegisterForm />
      </LoginProvider>
      <LoginFooter />
    </div>
  </div>
);
