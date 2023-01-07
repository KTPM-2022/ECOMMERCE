import styles from './AdminAddProduct.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classnames.bind(styles);

function DropDown({ parent = [], defaultValue = null, setFormData, field, values, multiplechoice = false }) {
  const [arrowUp, setArrowUp] = useState(false);
  const [showDropdownList, setShowDropdownList] = useState(false);
  const [DropdownResults, setDropdownResults] = useState(() => {
    if (defaultValue) {
      return defaultValue;
    }
    else if (multiplechoice) return [];
    else return '';
  });
  useEffect(()=>{
    setDropdownResults(prev=>defaultValue);
  },[defaultValue]);
  useEffect(() => {
    if (defaultValue) setDropdownResults(prev=>defaultValue);
    else if (!multiplechoice) setDropdownResults((prev) => '');
    else setDropdownResults((prev) => []);
  }, parent);
  
  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, [field]: DropdownResults };
    });
  }, [DropdownResults]);

  const handleClickDropdownItem = (e) => {
    setShowDropdownList((prev) => !prev);
    if (!multiplechoice) {
      setDropdownResults((prev) => {
        return e.target.innerText;
      });
    } else if (!DropdownResults.includes(e.target.innerText)) {
      setDropdownResults((prev) => {
        return [...prev, e.target.innerText];
      });
    }
    setArrowUp((prev) => !prev);
  };
  const handleDeleleDropdownResult = (e, value) => {
    e.stopPropagation();
    setDropdownResults((prev) => {
      return prev.filter((a) => a !== value);
    });
  };
  const handleClickDropdownHeader = (e) => {
    setShowDropdownList((prev) => !prev);
    setArrowUp((prev) => !prev);
  };
  return (
    <div className={cx('dropdown')}>
      <div className={cx('dropdown-header')} onClick={handleClickDropdownHeader}>
        {multiplechoice &&
          DropdownResults.map((value, index) => (
            <div className={cx('dropdown-result-multiple')} key={index}>
              {value}
              <i
                className={cx('dropdown-result-delete', 'icon-cross')}
                onClick={(e) => handleDeleleDropdownResult(e, value)}
              />
            </div>
          ))}
        {!multiplechoice && <div className={cx('dropdown-result')}> {DropdownResults}</div>}
        <i className={cx('dropdown-icon', 'icon-arrow', { up: arrowUp })} />
      </div>
      {showDropdownList && (
        <ul className={cx('dropdown-list')}>
          {values.map((value, index) => {
            return (
              <li key={index} className={cx('dropdown-item')} onClick={handleClickDropdownItem}>
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
