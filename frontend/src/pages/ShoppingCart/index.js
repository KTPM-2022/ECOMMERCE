import classnames from 'classnames/bind';
import styles from './ShoppingCart.module.scss';
import SizeList from 'src/components/UserSidebar/SizeList';
import ColorList from 'src/components/UserSidebar/ColorList';
import Quantity from '../ProductInfo/Quantity';
import Button from 'src/components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { removeShoppingCart, resetShoppingCart } from 'src/features/shoppingCart/shoppingCartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const cx = classnames.bind(styles);

function ShoppingCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user.id);
  const shoppingCarts = useSelector((state) => state.shoppingCart.value).filter((a) => a.user === user);
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME_CLOUDINARY,
    },
  });
  const total = shoppingCarts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.productPrice * currentValue.productQuantity;
  }, 0);
  const removeAnItemShoppingCart = (e, user, product, productSize, productColor) => {
    dispatch(removeShoppingCart({ user, product, productSize, productColor }));
  };
  const handleSubmit = (e) => {
    axios.post('/api/shoppingcart/addshoppingcart', { user, shoppingCarts }).catch((err) => console.log(err));
    dispatch(resetShoppingCart());
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', 'grid', 'wide')}>
        <div className={cx('title')}>My Bag</div>
        <div className={cx('row')}>
          <div className={cx('info', 'col', 'col-9')}>
            <div className={cx('info-row')}>
              <div className={cx('row')}>
                <div className={cx('info-title', 'col', 'col-4')}>Product</div>
                <div className={cx('info-title', 'col', 'col-2')}>Color</div>
                <div className={cx('info-title', 'col', 'col-2')}>Size</div>
                <div className={cx('info-title', 'col', 'col-2')}>Quantity</div>
                <div className={cx('info-title', 'col', 'col-2')}>Amount</div>
              </div>
            </div>
            {shoppingCarts.map((shoppingCart, index) => {
              return (
                <div key={index} className={cx('info-row')}>
                  <div className={cx('row')}>
                    <div className={cx('info-product', 'info-item', 'col', 'col-4')}>
                      <div className={cx('row', 'info-item-row')}>
                        <div className={cx('col', 'col-4')}>
                          <AdvancedImage
                            className={cx('info-photo')}
                            cldImg={cld.image(shoppingCart.productPhoto)}
                            alt="product"
                          />
                        </div>
                        <div className={cx('col', 'col-4', 'info-name-wrapper')}>
                          <div className={cx('info-name')}>{shoppingCart.productName}</div>
                          <div className={cx('info-action')}>
                            <Link
                              className={cx('info-action-btn')}
                              to={`/productinfo/${shoppingCart.product}?mode=update&size=${shoppingCart.productSize}&color=${shoppingCart.productColor}`}
                            >
                              <Button>Change</Button>
                            </Link>
                            <Button
                              className={cx('info-action-btn')}
                              onClick={(e) => {
                                removeAnItemShoppingCart(
                                  e,
                                  user,
                                  shoppingCart.product,
                                  shoppingCart.productSize,
                                  shoppingCart.productColor,
                                );
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('info-color', 'info-item', 'col', 'col-2')}>
                      <ColorList alwaysCheck values={[shoppingCart.productColor]} />
                    </div>
                    <div className={cx('info-size', 'info-item', 'col', 'col-2')}>{shoppingCart.productSize}</div>
                    <div className={cx('info-quantity', 'info-item', 'col', 'col-2')}>
                      {shoppingCart.productQuantity}
                    </div>
                    <div className={cx('info-amount', 'info-item', 'col', 'col-2')}>
                      ${shoppingCart.productPrice * shoppingCart.productQuantity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={cx('total', 'col', 'col-3')}>
            <div className={cx('total-title')}>Total</div>
            <div className={cx('total-body')}>
              <div className={cx('total-item')}>
                <div className={cx('total-item-name')}>Shipping & Handling:</div>
                <div className={cx('total-item-price')}>Free</div>
              </div>
              <div className={cx('total-item')}>
                <div className={cx('total-item-name')}>Total product::</div>
                <div className={cx('total-item-price')}>${total}</div>
              </div>
              <div className={cx('total-item', 'subtotal')}>
                <div className={cx('total-item-name')}>Subtotal:</div>
                <div className={cx('total-item-price')}>${total}</div>
              </div>
            </div>
            <Button fourth disabled={shoppingCarts.length === 0} className={cx('submit-btn')} onClick={handleSubmit}>
              Check out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
