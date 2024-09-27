import OutsideClickHandler from 'react-outside-click-handler';
import { useState } from 'react';
import './HeaderSearch.scss';
import { Search } from '../../../../svg';
import { block } from '../../../../helpers/bem.helpers';
import { SearchMenu } from '../SearchMenu/SearchMenu';

const b = block('HeaderSearch');

export const HeaderSearch = () => {
  const [isSearchMenuVisible, setSearchMenuVisible] = useState(false);

  const handleCloseSearchMenu = () => {
    setSearchMenuVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={handleCloseSearchMenu}>
      <div className={b()}>
        <Search color="#65676b" />
        <input
          type="text"
          placeholder="Search Facebook"
          className={b('input')}
          onFocus={() => setSearchMenuVisible(true)}
        />
      </div>
      {isSearchMenuVisible && (
        <SearchMenu color="#65676b" onClose={handleCloseSearchMenu} />
      )}
    </OutsideClickHandler>
  );
};
