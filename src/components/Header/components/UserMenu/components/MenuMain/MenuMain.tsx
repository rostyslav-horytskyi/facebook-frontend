import { MenuColumn, SmallCircle } from '../../UserMenu.styled';
import * as Styled from './MenuMain.styled';

export const MenuMain = ({
  iconClass,
  title,
  description,
  iconStyles,
}: {
  iconClass: string;
  title: string;
  description: string;
  iconStyles?: React.CSSProperties;
}) => (
  <Styled.Container>
    <SmallCircle>
      <i className={iconClass} style={iconStyles} />
    </SmallCircle>
    <MenuColumn>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Description>{description}</Styled.Description>
    </MenuColumn>
  </Styled.Container>
);
