import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function AvailableList({ values, setFilterList }) {
  const [availableList, setAvailableList] = useState([]);
  useEffect(() => {
    if (setFilterList)
      setFilterList((prev) => {
        return { ...prev, availableFilter: availableList };
      });
  }, [availableList]);
  const handleToggleCheckBox = (e, index) => {
    if (e.target.checked) setAvailableList((prev) => [...prev, index]);
    else setAvailableList((prev) => prev.filter((a) => a !== index));
  };
  return (
    <>
      {values.map((value, index) => {
        return (
          <label key={index} className={cx('available-item')}>
            <div className={cx('available-item-container')}>
              <span className={cx('available-item-title')}>{value}</span>
              <input
                type="checkbox"
                className={cx('available-item-checkbox')}
                onChange={(e) => handleToggleCheckBox(e, index)}
              />
            </div>
          </label>
        );
      })}
    </>
  );
}

export default AvailableList;
