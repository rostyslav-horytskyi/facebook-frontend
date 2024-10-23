import './Shortcut.scss';
import { block } from '../../../../helpers/bem.helpers';

const b = block('Shortcut');

export function Shortcut({
  link,
  img,
  name,
}: {
  link: string;
  img: string;
  name: string;
}) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className={b()}>
      <img src={img} alt={img} />
      <span>{name}</span>
    </a>
  );
}
