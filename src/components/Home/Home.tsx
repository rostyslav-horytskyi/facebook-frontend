import Header from '../Header/Header';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';
import { block } from '../../helpers/bem.helpers';
import './Home.scss';
import Stories from './components/Stories/Stories';
import CreatePost from './components/CreatePost/CreatePost';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import SendVerification from '../SendVerification/SendVerification';

const b = block('Home');

export const Home = () => {
  const { data: user } = useGetCurrentUser();

  // Show loading or error state if user data is not available
  if (!user) {
    return (
      <div className={b()}>
        <Header />
        <div className={b('loading')}>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className={b()}>
      <Header />
      <LeftSidebar user={user} />
      <div className={b('middle')}>
        <Stories />
        {!user.verified && <SendVerification />}
        <CreatePost user={user} />
      </div>
      <RightSidebar user={user} />
    </div>
  );
};
