import { create } from '../../../../../../data/all-menu';
import './RightSection.scss';
import { block } from '../../../../../../helpers/bem.helpers';

const b = block('RightSection');

export const RightSection = () => (
  <div className={b()}>
    <div className={b('header')}>Create</div>
    {create.map((item) => (
      <div className={`${b('item')} hover`}>
        <div className={b('circle')}>
          <i className={item.icon} />
        </div>
        {item.name}
      </div>
    ))}
  </div>
);
