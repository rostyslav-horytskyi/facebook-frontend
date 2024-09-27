import { AbsoluteHeader, AbsoluteWrapper } from '../../UserMenu.styled';
import { Circle } from '../../../../Header.styled';
import { MenuItem } from '../MenuItem/MenuItem';
import { menuItems } from './HelpSupport.utils';
import { HOVERS } from '../../../../../../constants';

export default function HelpSupport({
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
        Help & Support
      </AbsoluteHeader>
      {menuItems.map((item) => (
        <MenuItem iconClass={item.icon}>
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </AbsoluteWrapper>
  );
}
