import Header from '../Header/Header';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';

export const Home = () => (
  <div>
    <Header />
    {/* TODO: Use add user */}
    <LeftSidebar user={{}} />
    <RightSidebar user={{}} />
  </div>
);
