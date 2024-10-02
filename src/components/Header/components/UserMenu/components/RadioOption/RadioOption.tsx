import { block } from '../../../../../../helpers/bem.helpers';
import './RadioOption.scss';

const b = block('RadioOption');

export const RadioOption = ({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) => (
  <label className={`${b()} hover`} htmlFor={id}>
    <span>{label}</span>
    <input type="radio" name={name} id={id} className={b('input')} />
  </label>
);
