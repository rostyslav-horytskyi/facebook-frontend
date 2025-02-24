import './SendVerification.scss';
import { block } from '../../helpers/bem.helpers';
import { useSendVerification } from '../../hooks/useSendVerification';

const b = block('SendVerification');

export default function SendVerification() {
  const { sendVerification, successMessage, errorMessage, isLoading } =
    useSendVerification();

  return (
    <div className={b()}>
      <span>
        Your account is not verified. Verify your account before it gets deleted
        after a month from creation.
      </span>
      <span
        className={b('resend-link')}
        onClick={() => sendVerification(localStorage.getItem('token')!)}
        style={{
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        {isLoading ? 'Sending...' : 'Click here to resend verification link'}
      </span>
      {successMessage && <div className={b('success')}>{successMessage}</div>}
      {errorMessage && <div className={b('error')}>{errorMessage}</div>}
    </div>
  );
}
