import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useChangePassword } from '../../../../hooks/useChangePassword';
import LoginInput from '../../../Login/components/LoginInput/LoginInput';
import { block } from '../../../../helpers/bem.helpers';

const b = block('ResetForm');

export default function ChangePassword({
  password,
  setPassword,
  confPassword,
  setConfPassword,
  userInfos,
}: {
  password: string;
  setPassword: (val: string) => void;
  confPassword: string;
  setConfPassword: (val: string) => void;
  userInfos: any;
}) {
  const navigate = useNavigate();
  const { trigger, isMutating, error } = useChangePassword();
  const { email } = userInfos;

  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters.')
      .max(36, "Password can't be more than 36 characters."),
    confPassword: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const handleChangePassword = async () => {
    try {
      await trigger({ email, password });
      navigate('/login');
    } catch {
      // Error is handled by SWR
    }
  };

  return (
    <div className={b()} style={{ height: '310px' }}>
      <h2 className={b('header')}>Change Password</h2>
      <p className={b('text')}>Pick a strong password</p>

      <Formik
        enableReinitialize
        initialValues={{ password, confPassword }}
        validationSchema={validatePassword}
        onSubmit={handleChangePassword}
      >
        {() => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
            <LoginInput
              type="password"
              name="confPassword"
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="Confirm new password"
              bottom
            />
            {error?.message && (
              <div className={b('error')}>{error.message}</div>
            )}
            <div className={b('actions')}>
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn" disabled={isMutating}>
                {isMutating ? 'Changing...' : 'Continue'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
