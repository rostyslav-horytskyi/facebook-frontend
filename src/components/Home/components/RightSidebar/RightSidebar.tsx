import './RightSidebar.scss';
import { block } from '../../../../helpers/bem.helpers';
import { User } from '../../../../types';
import { Contacts } from './components/Contacts/Contacts';

const b = block('RightSidebar');

interface RightSidebarProps {
  user: User;
}

export function RightSidebar({ user }: RightSidebarProps) {
  return (
    <div className={b()}>
      <div className={b('heading')}>Sponsored</div>
      <div className={b('splitter')} />
      <Contacts user={user} />
    </div>
  );
}
