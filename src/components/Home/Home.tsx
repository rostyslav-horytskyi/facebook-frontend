import Header from '../Header/Header';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';
import { block } from '../../helpers/bem.helpers';
import './Home.scss';
import Stories from './components/Stories/Stories';
import CreatePost from './components/CreatePost/CreatePost';

const b = block('Home');

export const Home = () => (
  <div className={b()}>
    <Header />
    {/* TODO: Use add user */}
    <LeftSidebar user={{}} />
    <div className={b('middle')}>
      <Stories />
      <CreatePost user={{}} />
    </div>
    <RightSidebar user={{}} />
  </div>
);
