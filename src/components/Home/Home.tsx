import Header from '../Header/Header';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';
import { block } from '../../helpers/bem.helpers';
import './Home.scss';

const b = block('Home');

export const Home = () => (
  <div className={b()}>
    <Header />
    {/* TODO: Use add user */}
    <LeftSidebar user={{}} />
    <RightSidebar user={{}} />
  </div>
);
