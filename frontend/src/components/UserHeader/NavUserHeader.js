import styles from './UserHeader.module.scss';
import classnames from 'classnames/bind';
import NavItemUserHeader from './NavItemUserHeader';
import { useSelector } from 'react-redux';
const cx = classnames.bind(styles);

function NavUserHeader() {
  const productCategory = useSelector((state) => state.productCategory.value);
  return (
    <nav className={cx('nav')}>
      <div className={cx('nav-list')}>
        {productCategory.map((value, index) => {
          return <NavItemUserHeader key={index} title={value.gender} />;
        })}
      </div>
    </nav>
  );
}

export default NavUserHeader;
