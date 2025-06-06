import { block } from '../../../../../helpers/bem.helpers';
import './Story.scss';

const b = block('Story');

export interface StoryType {
  image: string;
  profile_picture: string;
  profile_name: string;
}

interface StoryProps {
  story: StoryType;
}

export default function Story({ story }: StoryProps) {
  return (
    <div className={b()}>
      <img src={story.image} alt="" className={b('img')} />
      <div className={b('profile-picture')}>
        <img src={story.profile_picture} alt="" />
      </div>
      <div className={b('profile-name')}>{story.profile_name}</div>
    </div>
  );
}
