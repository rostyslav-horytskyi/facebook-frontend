import { Link } from 'react-router-dom';
import { useState } from 'react';
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

const b = block('LeftSidebar');

export function LeftSidebar({ user }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`${b()} scrollbar`}>
      <Link to="/profile" className={`${b('profile-link')} hover1`}>
        <img
          src={user?.picture}
          alt={`${user?.first_name} ${user?.last_name}`}
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
        <Shortcut
          link="https://www.youtube.com/c/MohamedHaJJi1/featured"
          img="../../images/ytb.png"
          name="My Youtube channel"
        />
        <Shortcut
          link="https://www.instagram.com/med_hajji7/"
          img="../../images/insta.png"
          name="My Instagram"
        />
      </div>

      <div className={`fb-copyright ${visible ? 'relative' : ''}`}>
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad-choices-icon" />
        </Link>
        <span>. </span>
        <Link to="/">Cookies</Link> <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
}
