import styles from './UserHeader.module.scss';
import classnames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from 'src/assets/images/logo.png';
import Modal from 'src/components/Modal';
import { showModal } from 'src/features/modal/modalSlice';
import { logoutUser } from 'src/features/auth/authSlice';
import NavUserHeader from './NavUserHeader';
import Button from 'src/components/Button';

const cx = classnames.bind(styles);

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <header className={cx('wrapper')}>
      <Modal />
      <div className={cx('top')}>
        <div className={cx('container')}>
          <div className={cx('search')}>
            <input className={cx('search-input')} placeholder="Search" />
            <i className={cx('search-icon', 'icon-search')} />
          </div>
          <Link to="/">
            <img src={Logo} alt="logo" className={cx('logo')} />
          </Link>
          <div className={cx('info')}>
            {!user && (
              <Button className={cx('register-btn')} onClick={() => dispatch(showModal('register'))}>
                Register
              </Button>
            )}
            {!user && (
              <Button secondary className={cx('login-btn')} onClick={() => dispatch(showModal('login'))}>
                Log in
              </Button>
            )}
            {user && (
              <div className={cx('avatar-dropdown')}>
                <span className={cx('avatar')}>{user.name}</span>
                <ul className={cx('dropdown-list')}>
                  <li className={cx('dropdown-item')}>Account setting</li>
                  <li className={cx('dropdown-item')} onClick={() => dispatch(logoutUser())}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
            <Link to="/shoppingcart">
              <i className={cx('cart', 'icon-cart')} />
            </Link>
          </div>
        </div>
      </div>
      <NavUserHeader />
    </header>
  );
}

export default Header;
