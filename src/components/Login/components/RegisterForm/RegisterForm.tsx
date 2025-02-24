import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GenderSelect } from '../GenderSelect/GenderSelect';
import { DateOfBirthSelect } from '../DateOfBirthSelect/DateOfBirthSelect';
import RegisterInput from '../RegisterInput/RegisterInput';
import { useRegisterUser } from '../../../../hooks/useRegisterUser';
import { registerValidation } from './RegisterForm.validations';
import { MONTHS, YEARS } from './RegisterForm.constants';
import { User } from '../../../../types';
import { block } from '../../../../helpers/bem.helpers';
import { useLogin } from '../../Login.context';
import './RegisterForm.scss';
import { FormButton } from '../shared/FormButton';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';
import { useAuth } from '../../../../context/AuthContext';

const b = block('RegisterForm');

export default function RegisterForm() {
  const [isRegisterFormVisible, setRegisterFormVisible] = useLogin();
  const { login } = useAuth();
  const navigate = useNavigate();
  const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };
  const [success, setSuccess] = useState('');

  const {
    trigger: registerUser,
    isMutating,
    error,
  } = useRegisterUser({
    onSuccess: (data) => {
      const { message } = data;

      setSuccess(message);
      setTimeout(() => {
        login(data.token);
        navigate('/');
      }, 2000);
    },
    onError: () => {
      setSuccess('');
    },
  });

  const handleSubmit = async (user: Omit<User, 'message'>) => {
    await registerUser(user);
  };

  if (!isRegisterFormVisible) {
    return null;
  }

  return (
    <div className="blur">
      <div className={b()}>
        <div className={b('header')}>
          <i
            className="exit_icon"
            onClick={() => setRegisterFormVisible(false)}
          />
          <span>Sign Up</span>
          <span>it&apos;s quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={userInfos}
          validationSchema={registerValidation}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors, isSubmitting }) => {
            const getDays = () =>
              new Date(values.bYear, values.bMonth, 0).getDate();
            const days = Array.from(
              new Array(getDays()),
              (val, index) => 1 + index
            );

            return (
              <Form className={b('form')}>
                <div className={b('line')}>
                  <RegisterInput
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    onChange={handleChange}
                    value={values.first_name}
                  />
                  <RegisterInput
                    type="text"
                    placeholder="Surname"
                    name="last_name"
                    onChange={handleChange}
                    value={values.last_name}
                  />
                </div>
                <div className={b('line')}>
                  <RegisterInput
                    type="text"
                    placeholder="Mobile number or email address"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
                <div className={b('line')}>
                  <RegisterInput
                    type="password"
                    placeholder="New password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                </div>
                <div className={b('column')}>
                  <div className={b('line-header')}>
                    Date of birth <i className="info_icon" />
                  </div>
                  <DateOfBirthSelect
                    days={days}
                    months={MONTHS}
                    years={YEARS}
                    handleRegisterChange={handleChange}
                    errors={errors}
                    values={values}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className={b('column')}>
                  <div className={b('line-header')}>
                    Gender <i className="info_icon" />
                  </div>

                  <GenderSelect
                    handleRegisterChange={handleChange}
                    errors={errors}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className={b('infos')}>
                  By clicking Sign Up, you agree to our{' '}
                  <span>Terms, Data Policy &nbsp;</span>
                  and <span>Cookie Policy.</span> You may receive SMS
                  notifications from us and can opt out at any time.
                </div>
                <div className={b('btn-wrapper')}>
                  <FormButton
                    type="submit"
                    className={`${b('signup')} blue_btn`}
                  >
                    Sign Up
                  </FormButton>
                </div>
                <LoadingSpinner loading={isMutating} />
                <ErrorDisplay error={error} className={b('error')} />
                {success && <div className={b('success')}>{success}</div>}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
