import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
import useDebounce from 'src/utils/hooks/useDebounce';
const cx = classnames.bind(styles);

function PriceList({ setFilterList }) {
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(100);
  const leftValueDebounce = useDebounce(leftValue, 500);
  const rightValueDebounce = useDebounce(rightValue, 500);
  useEffect(() => {
    if (setFilterList)
      setFilterList((prev) => {
        return {
          ...prev,
          priceFilter: {
            left: 3 * leftValueDebounce,
            right: 3 * rightValueDebounce,
          },
        };
      });
  }, [leftValueDebounce, rightValueDebounce]);
  const handleUpdateLeftValue = (e) => {
    if (e.target.value <= rightValue && e.target.value < 100) setLeftValue(Number(e.target.value));
  };
  const handleUpdateRightValue = (e) => {
    if (e.target.value >= leftValue && e.target.value > 0) setRightValue(Number(e.target.value));
  };
  return (
    <div className={cx('price-item-wrapper')}>
      <div className={cx('price-item-track')}></div>
      <div className={cx('price-item-range')} style={{ left: `${leftValue}%`, right: `${100 - rightValue}%` }}></div>
      <div
        className={cx('price-item-thunk', 'price-item-thunk-left')}
        style={{
          left: `${leftValue}%`,
          transform: `translateX(${-leftValue}%)`,
        }}
      ></div>
      <div
        className={cx('price-item-thunk', 'price-item-thunk-right')}
        style={{
          right: `${100 - rightValue}%`,
          transform: `translateX(${100 - rightValue}%)`,
        }}
      ></div>
      <input type="range" className={cx('price-item-input')} value={leftValue} onChange={handleUpdateLeftValue} />
      <input type="range" className={cx('price-item-input')} value={rightValue} onChange={handleUpdateRightValue} />
      <div className={cx('price-item-value-wrapper')}>
        <span className={cx('price-item-value')}>${3 * leftValue}</span>
        <span className={cx('price-item-value')}>${3 * rightValue}</span>
      </div>
    </div>
  );
}

export default PriceList;
