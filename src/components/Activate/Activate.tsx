import { useParams } from 'react-router-dom';
import ActivateForm from './ActivateForm/ActivateForm';
import './Activate.scss';
import { Home } from '../Home/Home';
import { useActivateAccount } from '../../hooks/useActivateAccount';

export default function Activate() {
  const { token } = useParams();
  const { success, loading, error } = useActivateAccount(token);

  const getActivateFormProps = () => {
    if (success) {
      return {
        type: 'success',
        header: 'Account verification succeeded.',
        text: success,
      };
    }
    if (error) {
      return {
        type: 'error',
        header: 'Account verification failed.',
        text: error,
      };
    }
    return null;
  };

  const activateFormProps = getActivateFormProps();

  return (
    <>
      {activateFormProps && (
        <ActivateForm {...activateFormProps} loading={loading} />
      )}
      <Home />
    </>
  );
}
