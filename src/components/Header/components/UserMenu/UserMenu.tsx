import { useState, useMemo } from 'react';
import DisplayAccessibility from './components/DisplayAccessibility/DisplayAccessibility';
import HelpSupport from './components/HelpSupport/HelpSupport';
import SettingsPrivacy from './components/SettingsPrivacy/SettingsPrivacy';
import * as Styled from './UserMenu.styled';
import { UserMenuItem } from './components/UserMenuItem/UserMenuItem';
import { MenuMain } from './components/MenuMain/MenuMain';
import { MENU_VIEWS } from './UserMenu.constants';
import { HOVERS } from '../../../../constants';

export default function UserMenu({ user }) {
  const [visible, setVisible] = useState(MENU_VIEWS.MAIN);

  console.log(visible);

  const userProfileLink = useMemo(
    () => `${user?.first_name} ${user?.last_name}`,
    [user?.first_name, user?.last_name]
  );

  const handleMenuClick = (view: string) => setVisible(view);

  const handleNavigationToMain = () => setVisible(MENU_VIEWS.MAIN);

  return (
    <Styled.Menu>
      {visible === MENU_VIEWS.MAIN && (
        <>
          <Styled.MenuHeader to="/profile" $hoverType={HOVERS.HOVER}>
            <img src={user?.picture} alt="User Profile" />
            <Styled.MenuColumn>
              <span>{userProfileLink}</span>
              <span>See your profile</span>
            </Styled.MenuColumn>
          </Styled.MenuHeader>

          <Styled.Splitter />
          <MenuMain
            iconClass="report_filled_icon"
            title="Give feedback"
            description="Help us improve Facebook"
          />
          <Styled.Splitter />
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
            onClick={() => console.log('Logout')}
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
    </Styled.Menu>
  );
}
