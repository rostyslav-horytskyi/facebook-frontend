import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { block } from '../../helpers/bem.helpers';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Watch,
} from '../../svg';
import './Header.scss';
import { HeaderSearch } from './components/HeaderSearch/HeaderSearch';
import AllMenu from './components/AllMenu/AllMenu';
import UserMenu from './components/UserMenu/UserMenu';

const b = block('Header');
// TODO: fix any type
const selector = (state: any) => state.user;

const Header = () => {
  const [menu, setMenu] = useState('');
  const user = useSelector(selector);

  const handleOutsideClick = () => {
    setMenu('');
  };

  return (
    <header className={b()}>
      <div className={b('left')}>
        <Link to="/" className={b('logo')}>
          <div className={b('circle')}>
            <Logo />
          </div>
        </Link>
        <HeaderSearch />
      </div>
      <div className={b('middle')}>
        <Link to="/" className={b('navigation-icon', { active: true })}>
          <HomeActive />
        </Link>
        <Link to="/" className={b('navigation-icon').mix('hover')}>
          <Friends color="#65676b" />
        </Link>
        <Link to="/" className={b('navigation-icon').mix('hover')}>
          <Watch color="#65676b" />
          <div className={b('middle-notification')}>+9</div>
        </Link>
        <Link to="/" className={b('navigation-icon').mix('hover')}>
          <Market color="#65676b" />
        </Link>
        <Link to="/" className={b('navigation-icon').mix('hover')}>
          <Gaming color="#65676b" />
        </Link>
      </div>
      <div className={b('right')}>
        <Link to="/profile" className={b('profile-link').mix('hover')}>
          <img
            src={user?.picture}
            alt="Profile"
            className={b('profile-image')}
          />
          <span>{user?.first_name}</span>
        </Link>
        <div className={b('circle-icon').mix('hover')}>
          <Menu onClick={() => setMenu('all')} />
          {menu === 'all' && (
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              <AllMenu />
            </OutsideClickHandler>
          )}
        </div>
        <div className={b('circle-icon').mix('hover')}>
          <Messenger />
        </div>
        <div className={b('circle-icon').mix('hover')}>
          <Notifications />
          <div className={b('right-notification')}>5</div>
        </div>
        <div className={b('circle-icon').mix('hover')}>
          <ArrowDown onClick={() => setMenu('user')} />
          {menu === 'user' && (
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              <UserMenu user={user} />
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
