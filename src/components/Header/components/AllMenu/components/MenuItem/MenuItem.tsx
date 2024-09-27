import { block } from '../../../../../../helpers/bem.helpers';
import './MenuItem.scss';

const b = block('MenuItem');

export default function MenuItem({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: string;
}) {
  return (
    <div className={`${b()} hover`}>
      <img src={`../../left/${icon}.png`} alt="img" />
      <div className={b('column')}>
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
