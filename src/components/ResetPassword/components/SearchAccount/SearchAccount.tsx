import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFindUser } from '../../../../hooks/useFindUser';
import LoginInput from '../../../Login/components/LoginInput/LoginInput';
import { block } from '../../../../helpers/bem.helpers';

const b = block('ResetForm');

export default function SearchAccount({
  email,
  setEmail,
  setUserInfos,
  setVisible,
}: {
  email: string;
  setEmail: (val: string) => void;
  setUserInfos: (val: any) => void;
  setVisible: (val: number) => void;
}) {
  const { trigger, isMutating, error } = useFindUser();

  const validateEmail = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email address.')
      .max(50, "Email address can't be more than 50 characters."),
  });

  const handleSearch = async () => {
    try {
      const userInfo = await trigger(email);
      setUserInfos(userInfo);
      setVisible(1);
    } catch {
      // SWR handles the error state, no need for additional handling
    }
  };

  return (
    <div className={b()}>
      <h2 className={b('header')}>Find Your Account</h2>
      <p className={b('text')}>
        Please enter your email address or mobile number to search for your
        account.
      </p>

      <Formik
        enableReinitialize
        initialValues={{ email }}
        validationSchema={validateEmail}
        onSubmit={handleSearch}
      >
        {() => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {error?.message && (
              <div className={b('error')}>{error.message}</div>
            )}
            <div className={b('actions')}>
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn" disabled={isMutating}>
                {isMutating ? 'Searching...' : 'Search'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
