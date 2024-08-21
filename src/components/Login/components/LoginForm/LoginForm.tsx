import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import DotLoader from 'react-spinners/DotLoader';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import LoginInput from '../LoginInput/LoginInput';
import { useLogin } from '../../Login.context';
import { useLoginUser } from '../../../../hooks/useLoginUser';
import { loginValidation } from './LoginForm.validations';
import { block } from '../../../../helpers/bem.helpers';
import { login } from '../../../../store/slices/userSlice';
import './LoginForm.scss';

const b = block('LoginForm');

const loginInfos = {
  email: '',
  password: '',
};
export default function LoginForm() {
  const [, setRegisterFormVisible] = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    trigger: loginUser,
    isMutating,
    error,
  } = useLoginUser({
    onSuccess: (data) => {
      dispatch(login(data));
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
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className={b('forgot-password')}>
            Forgotten password?
          </Link>
          <DotLoader color="#1876f2" loading={isMutating} size={30} />

          {error && (
            <div className={b('error')}>
              {error.response?.data?.message || error.message}
            </div>
          )}
          <div className={b('splitter')} />
          <button
            className={b('open-signup').mix('blue_btn')}
            onClick={() => setRegisterFormVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className={b('sign-extra')}>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
