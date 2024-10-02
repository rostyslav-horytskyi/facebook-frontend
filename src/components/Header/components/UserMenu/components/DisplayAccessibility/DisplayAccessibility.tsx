import { MenuMain } from '../MenuMain/MenuMain';
import { RadioOption } from '../RadioOption/RadioOption';
import { MenuItem } from '../MenuItem/MenuItem';
import { RightArrow } from '../RighArrow/RightArrow';
import { absoluteBlock, circleBlock } from '../../../../Header.helpers';

export default function DisplayAccessibility({
  onNavigateToMain,
}: {
  onNavigateToMain: () => void;
}) {
  return (
    <div className={absoluteBlock()}>
      <div className={absoluteBlock('header')}>
        <div
          className={circleBlock().mix('hover')}
          onClick={onNavigateToMain}
          aria-label="Go back"
        >
          <i className="arrow_back_icon" />
        </div>
        Display & Accessibility
      </div>
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
    </div>
  );
}
