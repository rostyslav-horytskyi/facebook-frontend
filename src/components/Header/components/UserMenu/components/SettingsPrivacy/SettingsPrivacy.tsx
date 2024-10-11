import { MenuItem } from '../MenuItem/MenuItem';
import { menuItems } from './SettingsPrivacy.utils';
import { absoluteBlock, circleBlock } from '../../../../Header.helpers';

export default function SettingsPrivacy({
  onNavigateToMain,
}: {
  onNavigateToMain: () => void;
}) {
  return (
    <div className={absoluteBlock()}>
      <div className={absoluteBlock('header')}>
        <div onClick={onNavigateToMain} className={`${circleBlock()} hover`}>
          <i className="arrow_back_icon" />
        </div>
        Settings & privacy
      </div>
      {menuItems.map((item) => (
        <MenuItem key={item.icon} iconClass={item.icon}>
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </div>
  );
}
