import { block } from '../../../../../../helpers/bem.helpers';
import './Contact.scss';

const b = block('Contact');

export default function Contact({ user }) {
  return (
    <div className={`${b()} deep_hover`}>
      <div className={b('image')}>
        <img src={user?.picture} alt="" />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
