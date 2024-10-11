import { useRef } from 'react';
import { Return } from '../../../../svg';
import './SearchMenu.scss';
import { block } from '../../../../helpers/bem.helpers';
import { circleBlock } from '../../Header.helpers';

const b = block('SearchMenu');

export const SearchMenu = ({
  color,
  onClose,
}: {
  color: string;
  onClose: () => void;
}) => {
  const menu = useRef(null);

  return (
    <div className={b()} ref={menu}>
      <div className={b('wrap')}>
        <div className={b('header-logo')}>
          <div onClick={onClose} className={`${circleBlock()} hover`}>
            <Return color={color} />
          </div>
        </div>
      </div>
      <div className={b('history-header')}>
        <span>Recent searches</span>
        <a href="/">Edit</a>
      </div>
      <div className={b('history')} />
      <div className={b('results')} />
    </div>
  );
};
