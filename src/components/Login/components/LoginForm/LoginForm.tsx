import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginInput from '../LoginInput/LoginInput';
import { useLogin } from '../../Login.context';
import { useLoginUser } from '../../../../hooks/useLoginUser';
import { loginValidation } from './LoginForm.validations';
import { block } from '../../../../helpers/bem.helpers';
import './LoginForm.scss';
import { FormButton } from '../shared/FormButton';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';
import { useAuth } from '../../../../context/AuthContext';
import { LoginInfo } from '../../../../types';

const b = block('LoginForm');

const loginInfos = {
  email: '',
  password: '',
};
export default function LoginForm() {
  const [, setRegisterFormVisible] = useLogin();
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    trigger: loginUser,
    isMutating,
    error,
  } = useLoginUser({
    onSuccess: (data) => {
      login((data as LoginInfo).token);
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    },
  });

  const handleSubmit = async (loginData: {
    email: string;
    password: string;
  }) => {
    loginUser(loginData);
  };

  return (
    <div className={b()}>
      <div className={b('header')}>
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className={b('form-wrapper')}>
        <div className={b('form')}>
          <Formik
            enableReinitialize
            initialValues={loginInfos}
            validationSchema={loginValidation}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleChange}
                  value={values.email}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  bottom
                />
                <FormButton type="submit">Log In</FormButton>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className={b('forgot-password')}>
            Forgotten password?
          </Link>
          <LoadingSpinner loading={isMutating} />
          <ErrorDisplay error={error} className={b('error')} />
          <div className={b('splitter')} />
          <FormButton
            className={`${b('open-signup')} blue_btn`}
            onClick={() => setRegisterFormVisible(true)}
          >
            Create Account
          </FormButton>
        </div>
        <Link to="/" className={b('sign-extra')}>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
