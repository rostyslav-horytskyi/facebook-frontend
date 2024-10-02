import { menuItemBlock, smallCircleBlock } from '../../../../Header.helpers';

export const MenuItem = ({
  iconClass,
  children,
}: {
  iconClass: string;
  children: React.ReactNode;
}) => (
  <div className={`${menuItemBlock()} deep_hover`}>
    <div className={smallCircleBlock()}>
      <i className={iconClass} />
    </div>
    {children}
  </div>
);
