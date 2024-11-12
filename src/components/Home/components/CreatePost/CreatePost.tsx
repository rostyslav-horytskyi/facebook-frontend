import { Feeling, LiveVideo, Photo } from '../../../../svg';
import './CreatePost.scss';
import { block } from '../../../../helpers/bem.helpers';

const b = block('CreatePost');

export default function CreatePost({ user }) {
  return (
    <div className={b()}>
      <div className={b('header')}>
        <img src={user?.picture} alt="" />
        <div className={`${b('open-post')} middle_hover`}>
          What&apos;s on your mind, {user?.first_name}
        </div>
      </div>
      <div className={b('splitter')} />
      <div className={b('body')}>
        <div className={`${b('icon')} hover`}>
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className={`${b('icon')} hover`}>
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className={`${b('icon')} hover`}>
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}
