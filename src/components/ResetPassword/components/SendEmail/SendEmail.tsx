import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSendResetPasswordCode } from '../../../../hooks/useSendResetPasswordCode';
import { block } from '../../../../helpers/bem.helpers';

const bReset = block('Reset');
const bForm = block('ResetForm');

export default function SendEmail({
  userInfos,
  email,
  setVisible,
}: {
  userInfos: any;
  email: string;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { trigger, isMutating, error } = useSendResetPasswordCode();

  const handleSendEmail = useCallback(async () => {
    try {
      await trigger(email);
      setVisible(2);
    } catch {
      // SWR handles the error, no need for extra state management
    }
  }, [trigger, email, setVisible]);

  return (
    <div className={`${bReset('dynamic-height')} ${bForm()}`}>
      <h2 className={bForm('header')}>Reset Your Password</h2>

      <div className={bReset('grid')}>
        <div className={bReset('left')}>
          <p className={bForm('text')}>
            How do you want to receive the code to reset your password?
          </p>

          <label htmlFor="emailOption" className="hover1">
            <input type="radio" id="emailOption" checked readOnly />
            <div className={bReset('label-col')}>
              <span>Send code via email</span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>

        <div className={bReset('right')}>
          <img src={userInfos.picture} alt={`${userInfos.email} profile`} />
          <span>{userInfos.email}</span>
          <span>Facebook user</span>
        </div>
      </div>

      {error?.message && (
        <div className={bForm('error')} style={{ padding: '10px' }}>
          {error.message}
        </div>
      )}

      <div className={bForm('actions')}>
        <Link to="/login" className="gray_btn">
          Not You?
        </Link>
        <button
          onClick={handleSendEmail}
          className="blue_btn"
          disabled={isMutating}
        >
          {isMutating ? 'Sending...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
