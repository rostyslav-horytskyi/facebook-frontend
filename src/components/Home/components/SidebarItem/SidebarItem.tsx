import { block } from '../../../../helpers/bem.helpers';
import './SidebarItem.scss';

const b = block('SidebarItem');

export function SidebarItem({
  img,
  text,
  notification,
}: {
  img: string;
  text: string;
  notification?: string | number;
}) {
  return (
    <div className={`${b()} hover`}>
      <img src={`../../../../left/${img}.png`} alt={img} />
      {notification ? (
        <div className={b('column')}>
          <div className={b('text')}>{text}</div>
          <div className={b('notification')}>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
