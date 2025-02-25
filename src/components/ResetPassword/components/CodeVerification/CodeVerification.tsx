import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useVerifyCode } from '../../../../hooks/useVerifyCode';
import LoginInput from '../../../Login/components/LoginInput/LoginInput';
import { block } from '../../../../helpers/bem.helpers';

const b = block('ResetForm');

export default function CodeVerification({
  code,
  setCode,
  setVisible,
  userInfos,
}: {
  code: string;
  setCode: (val: string) => void;
  setVisible: (val: number) => void;
  userInfos: any;
}) {
  const { trigger, isMutating, error } = useVerifyCode();
  const { email } = userInfos;

  const validateCode = Yup.object({
    code: Yup.string()
      .required('Code is required')
      .length(5, 'Code must be exactly 5 characters.'),
  });

  const handleVerifyCode = async () => {
    try {
      await trigger({ email, code });
      setVisible(3);
    } catch {
      // Error is handled by SWR
    }
  };

  return (
    <div className={b()}>
      <h2 className={b('header')}>Code Verification</h2>
      <p className={b('text')}>
        Please enter the code that has been sent to your email.
      </p>

      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={handleVerifyCode}
      >
        {() => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            {error?.message && (
              <div className={b('error')}>{error.message}</div>
            )}
            <div className={b('actions')}>
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn" disabled={isMutating}>
                {isMutating ? 'Verifying...' : 'Continue'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
