import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DisplayAccessibility from './components/DisplayAccessibility/DisplayAccessibility';
import HelpSupport from './components/HelpSupport/HelpSupport';
import SettingsPrivacy from './components/SettingsPrivacy/SettingsPrivacy';
import { UserMenuItem } from './components/UserMenuItem/UserMenuItem';
import { MenuMain } from './components/MenuMain/MenuMain';
import { MENU_VIEWS } from './UserMenu.constants';
import { block, splitterBlock } from '../../../../helpers/bem.helpers';
import './UserMenu.scss';
import { useAuth } from '../../../../context/AuthContext';
import { User } from '../../../../types';

const b = block('UserMenu');

export default function UserMenu({ user }: { user: User }) {
  const [visible, setVisible] = useState(MENU_VIEWS.MAIN);
  const { logout } = useAuth();

  const userProfileLink = useMemo(
    () => `${user?.first_name} ${user?.last_name}`,
    [user?.first_name, user?.last_name]
  );

  const handleMenuClick = (view: string) => setVisible(view);

  const handleNavigationToMain = () => setVisible(MENU_VIEWS.MAIN);

  return (
    <div className={b()}>
      {visible === MENU_VIEWS.MAIN && (
        <>
          <Link to="/profile" className={`${b('header')} hover`}>
            <img src={user?.picture} alt="User Profile" />
            <div className={b('column')}>
              <span>{userProfileLink}</span>
              <span>See your profile</span>
            </div>
          </Link>

          <div className={splitterBlock()} />
          <MenuMain
            iconClass="report_filled_icon"
            title="Give feedback"
            description="Help us improve Facebook"
          />
          <div className={splitterBlock()} />
          <UserMenuItem
            iconClass="settings_filled_icon"
            text="Settings & privacy"
            onClick={() => handleMenuClick(MENU_VIEWS.SETTINGS_PRIVACY)}
          />
          <UserMenuItem
            iconClass="help_filled_icon"
            text="Help & support"
            onClick={() => handleMenuClick(MENU_VIEWS.HELP_SUPPORT)}
          />
          <UserMenuItem
            iconClass="dark_filled_icon"
            text="Display & Accessibility"
            onClick={() => handleMenuClick(MENU_VIEWS.DISPLAY_ACCESSIBILITY)}
          />
          <UserMenuItem
            iconClass="logout_filled_icon"
            text="Logout"
            onClick={() => logout()}
          />
        </>
      )}

      {visible === MENU_VIEWS.SETTINGS_PRIVACY && (
        <SettingsPrivacy onNavigateToMain={handleNavigationToMain} />
      )}
      {visible === MENU_VIEWS.HELP_SUPPORT && (
        <HelpSupport onNavigateToMain={handleNavigationToMain} />
      )}
      {visible === MENU_VIEWS.DISPLAY_ACCESSIBILITY && (
        <DisplayAccessibility onNavigateToMain={handleNavigationToMain} />
      )}
    </div>
  );
}
