import PropagateLoader from 'react-spinners/PropagateLoader';
import { block } from '../../../helpers/bem.helpers';

const b = block('Popup');

export default function ActivateForm({
  type,
  header,
  text,
  loading,
}: {
  type: string;
  header: string;
  text: string;
  loading: boolean;
}) {
  return (
    <div className="blur">
      <div className={b()}>
        <div className={b('header', { [type]: true })}>{header}</div>
        <div className={b('message')}>{text}</div>
        <PropagateLoader color="#1876f2" size={20} loading={loading} />
      </div>
    </div>
  );
}
