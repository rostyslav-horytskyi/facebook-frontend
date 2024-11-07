import './RightSidebar.scss';
import { block } from '../../../../helpers/bem.helpers';
import { Contacts } from './components/Contacts/Contacts';

const b = block('RightSidebar');

export function RightSidebar({ user }) {
  return (
    <div className={b()}>
      <div className={b('heading')}>Sponsored</div>
      <div className={b('splitter')} />
      <Contacts user={user} />
    </div>
  );
}
