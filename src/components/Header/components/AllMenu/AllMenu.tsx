import { LeftSection } from './components/LeftSection/LeftSection';
import { RightSection } from './components/RightSection/RightSection';
import { block } from '../../../../helpers/bem.helpers';
import './AllMenu.scss';

const b = block('AllMenu');

export default function AllMenu() {
  return (
    <div className={b()}>
      <div className={b('header')}>Menu</div>
      <div className={b('wrap').mix('scrollbar')}>
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}
