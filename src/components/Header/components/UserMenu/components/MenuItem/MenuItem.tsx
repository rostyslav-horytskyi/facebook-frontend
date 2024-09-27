import { MenuItemWrapper, SmallCircle } from '../../UserMenu.styled';
import { HOVERS } from '../../../../../../constants';

export const MenuItem = ({
  iconClass,
  children,
}: {
  iconClass: string;
  children: React.ReactNode;
}) => (
  <MenuItemWrapper $hoverType={HOVERS.DEEP_HOVER}>
    <SmallCircle>
      <i className={iconClass} />
    </SmallCircle>
    {children}
  </MenuItemWrapper>
);
