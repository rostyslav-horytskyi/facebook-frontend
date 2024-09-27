import { AbsoluteHeader, AbsoluteWrapper } from '../../UserMenu.styled';
import { Circle } from '../../../../Header.styled';
import { MenuItem } from '../MenuItem/MenuItem';
import { menuItems } from './SettingsPrivacy.utils';
import { HOVERS } from '../../../../../../constants';

export default function SettingsPrivacy({
  onNavigateToMain,
}: {
  onNavigateToMain: () => void;
}) {
  return (
    <AbsoluteWrapper>
      <AbsoluteHeader>
        <Circle onClick={onNavigateToMain} $hoverType={HOVERS.HOVER}>
          <i className="arrow_back_icon" />
        </Circle>
        Settings & privacy
      </AbsoluteHeader>
      {menuItems.map((item) => (
        <MenuItem key={item.icon} iconClass={item.icon}>
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </AbsoluteWrapper>
  );
}
