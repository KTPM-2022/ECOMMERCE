import styles from './ProductInfo.module.scss';
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
const cx = classnames.bind(styles);

function Quantity({quantityDefault=0, id=null, quantityMax, setFilterList }) {
  const [quantity, setQuantity] = useState(quantityDefault);
  useEffect(() => {
    if (setFilterList)
      setFilterList((prev) => {
        return { ...prev, quantity };
      });
  }, [quantity]);
  useEffect(()=>{
    setQuantity(prev=>quantityDefault);
  },[id]);
  const decreaseQuantityByOne = (e) => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };
  const increaseQuantityByOne = (e) => {
    if (quantity < quantityMax) setQuantity((prev) => prev + 1);
  };
  return (
    <div className={cx('quantity-choice')}>
      <div
        className={cx('decrease', 'quantity-icon', {
          disabled: quantity === 0,
        })}
        onClick={decreaseQuantityByOne}
      >
        <i className={cx('icon-minus')} />
      </div>
      <div className={cx('quantity')}>{quantity}</div>
      <div
        className={cx('increase', 'quantity-icon', {
          disabled: quantity === quantityMax,
        })}
        onClick={increaseQuantityByOne}
      >
        <i className={cx('icon-plus')} />
      </div>
    </div>
  );
}

export default Quantity;
