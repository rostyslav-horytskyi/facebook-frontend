import { MenuItemWrapper, SmallCircle } from '../../UserMenu.styled';
import { RightArrow } from '../RighArrow/RightArrow';
import { HOVERS } from '../../../../../../constants';

export const UserMenuItem = ({
  iconClass,
  text,
  onClick,
}: {
  iconClass: string;
  text: string;
  onClick: () => void;
}) => (
  <MenuItemWrapper onClick={onClick} $hoverType={HOVERS.DEEP_HOVER}>
    <SmallCircle>
      <i className={iconClass} />
    </SmallCircle>
    <span>{text}</span>
    <RightArrow />
  </MenuItemWrapper>
);
