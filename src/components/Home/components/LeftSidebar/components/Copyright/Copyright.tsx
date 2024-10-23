import { Link } from 'react-router-dom';
import { block } from '../../../../../../helpers/bem.helpers';
import './Copyright.scss';

const b = block('Copyright');

export const Copyright = ({ visible }: { visible: boolean }) => (
  <div className={b({ relative: visible })}>
    <Link to="/">Privacy </Link>
    <span>. </span>
    <Link to="/">Terms </Link>
    <span>. </span>
    <Link to="/">Advertising </Link>
    <span>. </span>
    <Link to="/">
      Ad Choices <i className="ad-choices-icon" />
    </Link>
    <span>. </span>
    <Link to="/">Cookies</Link> <span>. </span>
    <Link to="/">More </Link>
    <span>. </span> <br />
    Meta © 2022
  </div>
);
