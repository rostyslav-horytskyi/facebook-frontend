import OutsideClickHandler from 'react-outside-click-handler';
import { useState } from 'react';
import './HeaderSearch.scss';
import { useMediaQuery } from 'react-responsive';
import { Search } from '../../../../svg';
import { block } from '../../../../helpers/bem.helpers';
import { SearchMenu } from '../SearchMenu/SearchMenu';

const b = block('HeaderSearch');

export const HeaderSearch = () => {
  const [isSearchMenuVisible, setSearchMenuVisible] = useState(false);
  const isTabletView = useMediaQuery({
    query: '(max-width: 1040px)',
  });

  const handleCloseSearchMenu = () => {
    setSearchMenuVisible(false);
  };

  const handleOpenSearchMenu = () => {
    if (isSearchMenuVisible) {
      return;
    }

    setSearchMenuVisible(true);
  };

  console.log({ isTabletView, isSearchMenuVisible });

  return (
    <OutsideClickHandler onOutsideClick={handleCloseSearchMenu}>
      <div
        className={b({ 'menu-visible': isSearchMenuVisible })}
        onClick={handleOpenSearchMenu}
      >
        <Search color="#65676b" />
        <input
          type="text"
          placeholder={
            !isTabletView || isSearchMenuVisible ? 'Search Facebook' : ''
          }
          className={b('input')}
        />
      </div>
      {isSearchMenuVisible && (
        <SearchMenu color="#65676b" onClose={handleCloseSearchMenu} />
      )}
    </OutsideClickHandler>
  );
};
