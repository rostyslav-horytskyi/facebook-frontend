import './ResetPassword.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchAccount from './components/SearchAccount/SearchAccount';
import SendEmail from './components/SendEmail/SendEmail';
import CodeVerification from './components/CodeVerification/CodeVerification';
import ChangePassword from './components/ChangePassword/ChangePassword';
import LoginFooter from '../Login/components/LoginFooter/LoginFooter';
import { useAuth } from '../../context/AuthContext';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import { STEPS } from './constants';
import { block } from '../../helpers/bem.helpers';

const b = block('Reset');

export default function ResetPassword() {
  const { data: user } = useGetCurrentUser();
  const { logout } = useAuth();

  const [step, setStep] = useState(STEPS.SEARCH_ACCOUNT);
  const [resetState, setResetState] = useState({
    email: '',
    code: '',
    password: '',
    confPassword: '',
    userInfos: '',
  });

  const updateState = (field: string, value: string) => {
    setResetState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={b()}>
      <div className={b('header')}>
        <img src="../../../icons/facebook.svg" alt="Facebook Logo" />
        {user ? (
          <div className={b('right')}>
            <Link to="/profile">
              <img src={user.picture} alt="User Profile" />
            </Link>
            <button className="blue_btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className={b('right')}>
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className={b('wrap')}>
        {step === STEPS.SEARCH_ACCOUNT && (
          <SearchAccount
            email={resetState.email}
            setEmail={(email) => updateState('email', email)}
            setUserInfos={(userInfos) => updateState('userInfos', userInfos)}
            setVisible={setStep}
          />
        )}
        {step === STEPS.SEND_EMAIL && resetState.userInfos && (
          <SendEmail
            email={resetState.email}
            userInfos={resetState.userInfos}
            setVisible={setStep}
          />
        )}
        {step === STEPS.VERIFY_CODE && (
          <CodeVerification
            code={resetState.code}
            setCode={(code) => updateState('code', code)}
            setVisible={setStep}
            userInfos={resetState.userInfos}
          />
        )}
        {step === STEPS.CHANGE_PASSWORD && (
          <ChangePassword
            password={resetState.password}
            confPassword={resetState.confPassword}
            setPassword={(password) => updateState('password', password)}
            setConfPassword={(confPassword) =>
              updateState('confPassword', confPassword)
            }
            userInfos={resetState.userInfos}
          />
        )}
      </div>
      <LoginFooter />
    </div>
  );
}
