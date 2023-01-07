import styles from './AdminSidebar.module.scss';
import classnames from 'classnames/bind';
import Logo from 'src/assets/images/logo.png';
import NavItemAdminSidebar from './NavItemAdminSidebar';

const cx = classnames.bind(styles);

function AdminSidebar() {
  return (
    <div className={cx('wrapper')}>
      <img src={Logo} alt="Logo" className={cx('logo')} />
      <div className={cx('nav-list')}>
        <NavItemAdminSidebar to="/" iconName="icon-overview" title="Overview" />
        <NavItemAdminSidebar to="/admin/orders" iconName="icon-cart" title="Orders" />
        <NavItemAdminSidebar to="/admin/products" iconName="icon-products" title="Products" />
        <NavItemAdminSidebar to="/" iconName="icon-payment" title="Payments" />
        <NavItemAdminSidebar to="/" iconName="icon-promotion" title="Promotions" />
        <NavItemAdminSidebar to="/" iconName="icon-setting" title="Setting" />
      </div>
    </div>
  );
}

export default AdminSidebar;
