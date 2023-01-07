import styles from './UserFooter.module.scss';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Logo from 'src/assets/images/logo.png';
import NavUserFooter from './NavUserFooter';

const cx = classnames.bind(styles);

function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('top')}>
        <div className={cx('container')}>
          <img src={Logo} className={cx('logo')} />
          <NavUserFooter />
          <div className={cx('media')}>
            <i className={cx('media-icon', 'icon-twitter')} />
            <i className={cx('media-icon', 'icon-facebook')} />
            <i className={cx('media-icon', 'icon-instagram')} />
          </div>
        </div>
      </div>
      <div className={cx('bottom')}>
        <div className={cx('container')}>
          <NavUserFooter />
          <div className={cx('policy')}>
            <Link to="/" className={cx('policy-item')}>
              Privacy Policy
            </Link>
            <Link to="/" className={cx('policy-item')}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
