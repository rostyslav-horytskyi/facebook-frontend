import './CreateStory.scss';
import { Plus } from '../../../../../svg';
import { block } from '../../../../../helpers/bem.helpers';

const b = block('CreateStory');

export const CreateStory = () => (
  <div className={b()}>
    <img src="../../../images/default_pic.png" alt="" className={b('img')} />
    <div className={b('plus')}>
      <Plus color="#fff" />
    </div>
    <div className={b('text')}>Create Story</div>
  </div>
);
