import { block, smallCircleBlock } from '../../../../../../helpers/bem.helpers';
import './MenuMain.scss';

const menuMainBlock = block('MenuMain');

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
  <div className={`${menuMainBlock()} deep_hover`}>
    <div className={smallCircleBlock()}>
      <i className={iconClass} style={iconStyles} />
    </div>
    <div className={menuMainBlock('column')}>
      <span className={menuMainBlock('title')}>{title}</span>
      <span className={menuMainBlock('description')}>{description}</span>
    </div>
  </div>
);
