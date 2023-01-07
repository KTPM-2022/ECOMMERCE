import styles from './Sidebar.module.scss';
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function ColorList({ values = [], id=null,setFilterList, alwaysCheck, defaultValue=null }) {
  const [color, setColor] = useState(null);
  useEffect(() => {
    if (setFilterList)
      setFilterList((prev) => {
        return { ...prev, colorFilter: color };
      });
  }, [color]);
  useEffect(()=>{
    setColor(prev=>null);
  },[id])
  useEffect(()=>{
    setColor(prev=>defaultValue);
  },[])
  const handleToggleCheckBox = (e, value) => {
    if (e.target.checked) {
      setColor((prev) => value);
    } else setColor((prev) => null);
  };
  return (
    <div className={cx('color-item-wrapper')}>
      {values.map((value, index) => {
        return (
          <label key={index}>
            <input
              type="checkbox"
              className={cx('color-item-checkbox')}
              checked={alwaysCheck || color === value}
              onChange={(e) => {
                handleToggleCheckBox(e, value);
              }}
            />
            <div className={cx('color-item')} style={{ backgroundColor: `${value}` }}></div>
          </label>
        );
      })}
    </div>
  );
}

export default ColorList;
