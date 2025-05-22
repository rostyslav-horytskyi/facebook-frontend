import { useMediaQuery } from 'react-responsive';
import { ArrowRight } from '../../../../svg';
import './Stories.scss';
import { stories } from '../../../../data/home';
import Story from './Story/Story';
import { block } from '../../../../helpers/bem.helpers';
import { CreateStory } from './CreateStory/CreateStory';

const b = block('Stories');

export default function Stories() {
  const query1175px = useMediaQuery({
    query: '(max-width: 1175px)',
  });
  const query1030px = useMediaQuery({
    query: '(max-width: 1030px)',
  });
  const query960px = useMediaQuery({
    query: '(max-width: 960px)',
  });
  const query885px = useMediaQuery({
    query: '(max-width: 885px)',
  });
  const max = query885px
    ? 5
    : query960px
      ? 4
      : query1030px
        ? 5
        : query1175px
          ? 4
          : stories.length;
  return (
    <div className={b()}>
      <CreateStory />
      {stories.slice(0, max).map((story) => (
        <Story story={story} key={story.profile_picture} />
      ))}
      <div className={b('circle')}>
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
