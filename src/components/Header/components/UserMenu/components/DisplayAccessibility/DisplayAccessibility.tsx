import { AbsoluteHeader, AbsoluteWrapper } from '../../UserMenu.styled';
import { MenuMain } from '../MenuMain/MenuMain';
import { RadioOption } from '../RadioOption/RadioOption';
import { MenuItem } from '../MenuItem/MenuItem';
import { Circle } from '../../../../Header.styled';
import { RightArrow } from '../RighArrow/RightArrow';
import { HOVERS } from '../../../../../../constants';

export default function DisplayAccessibility({
  onNavigateToMain,
}: {
  onNavigateToMain: () => void;
}) {
  return (
    <AbsoluteWrapper>
      <AbsoluteHeader>
        <Circle
          onClick={onNavigateToMain}
          aria-label="Go back"
          $hoverType={HOVERS.HOVER}
        >
          <i className="arrow_back_icon" />
        </Circle>
        Display & Accessibility
      </AbsoluteHeader>
      <MenuMain
        iconClass="dark_filled_icon"
        title="Dark Mode"
        description="Adjust the appearance of Facebook to reduce glare and give your eyes a break."
        iconStyles={{ width: 50, backgroundPositionX: 8 }}
      />
      <RadioOption id="darkOff" name="dark" label="Off" />
      <RadioOption id="darkOn" name="dark" label="On" />
      <MenuMain
        iconClass="compact_icon"
        title="Compact mode"
        description="Make your font size smaller so more content can fit on the screen."
        iconStyles={{ width: 50, backgroundPositionX: 8 }}
      />
      <RadioOption id="compactOff" name="compact" label="Off" />
      <RadioOption id="compactOn" name="compact" label="On" />
      <MenuItem iconClass="keyboard_icon">
        <span>Keyboard</span>
        <RightArrow />
      </MenuItem>
    </AbsoluteWrapper>
  );
}
