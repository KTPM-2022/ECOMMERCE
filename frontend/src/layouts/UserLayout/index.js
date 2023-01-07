import UserHeader from 'src/components/UserHeader';
import UserFooter from 'src/components/UserFooter';
import styles from './UserLayout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
function UserLayout({ children }) {
  return (
    <div>
      <UserHeader />
      {children}
      <UserFooter />
    </div>
  );
}

export default UserLayout;
