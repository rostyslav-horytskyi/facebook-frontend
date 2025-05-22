import { block } from '../../../../../../helpers/bem.helpers';
import { User } from '../../../../../../types';
import './Contact.scss';

const b = block('Contact');

interface ContactProps {
  user: User;
}

export default function Contact({ user }: ContactProps) {
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
