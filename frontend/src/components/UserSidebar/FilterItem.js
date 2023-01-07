import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';
import { useState } from 'react';
const cx = classnames.bind(styles);

function FilterItem({ children, name }) {
  const [showSubfilter, setShowSubfilter] = useState(false);
  const handleClickFilterTitle = (e) => {
    setShowSubfilter((prev) => !prev);
    e.currentTarget.classList.toggle(cx('up'));
  };
  return (
    <div className={cx('filter-item')}>
      <div className={cx('filter-item-header')} onClick={handleClickFilterTitle}>
        <span className={cx('filter-item-name')}>{name}</span>
        <i className={cx('filter-item-icon', 'icon-arrow')} />
      </div>
      {showSubfilter && <div className={cx('filter-item-body')}>{children}</div>}
    </div>
  );
}

export default FilterItem;
