import { Link } from 'react-router-dom';
import { useState, memo } from 'react';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import './LeftSidebar.scss';
// eslint-disable-next-line camelcase
import { left_sidebar } from '../../../../data/home';
import { ArrowDown1 } from '../../../../svg';
import { Shortcut } from '../Shortcut/Shortcut';
import {
  block,
  smallCircleBlock,
  splitterBlock,
} from '../../../../helpers/bem.helpers';
import { Copyright } from './components/Copyright/Copyright';
import { shortcuts } from './LeftSidebar.utils';

const b = block('LeftSidebar');

type LeftSidebarProps = {
  user: {
    picture: string;
    first_name: string;
    last_name: string;
  };
};

export const LeftSidebar = memo(({ user }: LeftSidebarProps) => {
  const [visible, setVisible] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setVisible((prev) => !prev);
    }
  };

  if (!user) {
    return <div className={b()}>Loading...</div>;
  }

  return (
    <div className={`${b()} scrollbar`}>
      <Link to="/profile" className={`${b('profile-link')} hover1`}>
        <img
          src={user.picture}
          alt={`${user.first_name} ${user.last_name}`}
          loading="lazy"
        />
        <span className={b('username')}>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>

      {/* eslint-disable-next-line camelcase */}
      {left_sidebar.slice(0, 8).map((link) => (
        <SidebarItem
          key={link.img}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}

      {!visible && (
        <div
          className={`${b('see-more')} hover1`}
          onClick={() => setVisible(true)}
          onKeyPress={handleKeyPress}
          role="button"
          aria-label="See more sidebar items"
          tabIndex={0}
        >
          <div className={smallCircleBlock()}>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}

      {visible && (
        <div className={b('more')}>
          {/* eslint-disable-next-line camelcase */}
          {left_sidebar.slice(8).map((link) => (
            <SidebarItem
              key={link.img}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div
            className={`${b('show-less')} hover1`}
            onClick={() => setVisible(false)}
            onKeyPress={handleKeyPress}
            role="button"
            aria-label="Show less sidebar items"
            tabIndex={0}
          >
            <div className={`${smallCircleBlock()} rotate360`}>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}

      <div className={splitterBlock()} />

      <div className={b('shortcuts')}>
        <div className={b('shortcuts-heading')}>Your Shortcuts</div>
        <div className={b('shortcuts-edit')}>Edit</div>
      </div>

      <div className={b('shortcut-list')}>
        {shortcuts.map((shortcut) => (
          <Shortcut key={shortcut.link} {...shortcut} />
        ))}
      </div>

      <Copyright visible={visible} />
    </div>
  );
});
