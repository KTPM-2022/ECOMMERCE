import styles from './AdminSidebar.module.scss';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function NavItemAdminSidebar({ to, iconName, title }) {
  return (
    <Link to={to} className={cx('nav-item')}>
      <i className={cx(iconName, 'nav-item-icon')} />
      <div className={cx('nav-item-title')}>{title}</div>
    </Link>
  );
}

export default NavItemAdminSidebar;
