import { MenuItem } from '../MenuItem/MenuItem';
import { menuItems } from './HelpSupport.utils';
import { absoluteBlock, circleBlock } from '../../../../Header.helpers';

export default function HelpSupport({
  onNavigateToMain,
}: {
  onNavigateToMain: () => void;
}) {
  return (
    <div className={absoluteBlock()}>
      <div className={absoluteBlock('header')}>
        <div onClick={onNavigateToMain} className={circleBlock().mix('hover')}>
          <i className="arrow_back_icon" />
        </div>
        Help & Support
      </div>
      {menuItems.map((item) => (
        <MenuItem iconClass={item.icon}>
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </div>
  );
}
