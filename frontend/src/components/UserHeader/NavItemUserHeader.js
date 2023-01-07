import styles from './UserHeader.module.scss';
import classnames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductCategory } from 'src/features/productCategory/productCategorySlice';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function NavItemUserHeader({ title }) {
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => state.productCategory.value);

  useEffect(() => {
    if (productCategory.length === 0) dispatch(getProductCategory());
  }, [productCategory]);
  return (
    <div className={cx('nav-item')}>
      <span className={cx('title')}>{title}</span>
      <i className={cx('arrow', 'icon-arrow')} />
      <div className={cx('subnav')}>
        {productCategory.length > 0 &&
          productCategory
            .find((a) => a.gender === title)
            .typeValue.map((value, index) => {
              return value.name;
            })
            .map((constantsKey, index) => {
              return (
                <Link
                  key={index}
                  to={`/productlist?genderFilter=${title}&typeFilter=${constantsKey}`}
                  className={cx('subnav-item')}
                >
                  {constantsKey}
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default NavItemUserHeader;
