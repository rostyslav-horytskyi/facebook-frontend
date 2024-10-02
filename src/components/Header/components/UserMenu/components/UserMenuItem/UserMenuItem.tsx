import { RightArrow } from '../RighArrow/RightArrow';
import { menuItemBlock, smallCircleBlock } from '../../../../Header.helpers';

export const UserMenuItem = ({
  iconClass,
  text,
  onClick,
}: {
  iconClass: string;
  text: string;
  onClick: () => void;
}) => (
  <div onClick={onClick} className={`${menuItemBlock()} deep_hover`}>
    <div className={smallCircleBlock()}>
      <i className={iconClass} />
    </div>
    <span>{text}</span>
    <RightArrow />
  </div>
);
