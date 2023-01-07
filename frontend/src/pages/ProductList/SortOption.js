import styles from './ProductList.module.scss';
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function SortOption({ setFilterList }) {
  const [sortList, setSortList] = useState({ field: null, isInc: true });
  useEffect(() => {
    setFilterList((prev) => {
      return { ...prev, sortFilter: sortList };
    });
  }, [sortList]);
  const [arrowUp, setArrowUp] = useState(false);
  const [showSortList, setShowSortList] = useState(false);
  const [sortType, setSortType] = useState('Popularity');
  const handleClickSortItem = (e, field, isInc) => {
    setShowSortList((prev) => !prev);
    setSortType(e.target.innerText);
    setArrowUp((prev) => !prev);
    setSortList((prev) => {
      return { ...prev, field, isInc };
    });
  };
  return (
    <div className={cx('sort')}>
      <div
        className={cx('sort-header')}
        onClick={() => {
          setShowSortList((prev) => !prev);
          setArrowUp((prev) => !prev);
        }}
      >
        <span className={cx('sort-name')}>Sort By: </span>
        <span className={cx('sort-type')}>{sortType}</span>
        <i className={cx('sort-icon', 'icon-arrow', { up: arrowUp })} />
      </div>
      {showSortList && (
        <ul className={cx('sort-list')}>
          <li
            className={cx('sort-item')}
            onClick={(e) => {
              handleClickSortItem(e, 'name', 1);
            }}
          >
            Popularity
          </li>
          <li
            className={cx('sort-item')}
            onClick={(e) => {
              handleClickSortItem(e, 'name', 1);
            }}
          >
            Name: A - Z
          </li>
          <li
            className={cx('sort-item')}
            onClick={(e) => {
              handleClickSortItem(e, 'price', 1);
            }}
          >
            Price: lowest to highest
          </li>
          <li
            className={cx('sort-item')}
            onClick={(e) => {
              handleClickSortItem(e, 'price', -1);
            }}
          >
            Price: highest to lowest
          </li>
        </ul>
      )}
    </div>
  );
}

export default SortOption;
