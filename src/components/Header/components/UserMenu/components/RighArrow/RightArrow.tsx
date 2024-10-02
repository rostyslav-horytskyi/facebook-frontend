import { block } from '../../../../../../helpers/bem.helpers';
import './RightArrow.scss';

const b = block('RightArrow');

export const RightArrow = () => (
  <div className={b()}>
    <i className="right_icon" />
  </div>
);
