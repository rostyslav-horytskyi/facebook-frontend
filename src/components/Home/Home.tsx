import Header from '../Header/Header';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';
import { block } from '../../helpers/bem.helpers';
import './Home.scss';
import Stories from './components/Stories/Stories';
import CreatePost from './components/CreatePost/CreatePost';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import { User } from '../../types';

const b = block('Home');

export const Home = () => {
  const { data } = useGetCurrentUser();

  return (
    <div className={b()}>
      <Header />
      <LeftSidebar user={data as User} />
      <div className={b('middle')}>
        <Stories />
        <CreatePost user={data} />
      </div>
      <RightSidebar user={data} />
    </div>
  );
};
