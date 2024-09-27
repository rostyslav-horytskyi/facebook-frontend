import MenuItem from '../MenuItem/MenuItem';
import { menu } from '../../../../../../data/all-menu';
import { block } from '../../../../../../helpers/bem.helpers';
import './LeftSection.scss';

const b = block('LeftSection');

export const LeftSection = () => (
  <div className={b()}>
    <div className={b('search')}>
      <i className="amm_s_ic" />
      <input type="text" placeholder="Search Menu" />
    </div>
    {menu.map(({ header, items }) => (
      <div className={b('group')}>
        <div className={b('group-header')}>{header}</div>
        {items.map((item) => (
          <MenuItem
            name={item.name}
            description={item.description}
            icon={item.icon}
            key={item.name}
          />
        ))}
      </div>
    ))}
  </div>
);
