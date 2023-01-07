import styles from './AdminOrders.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
const cx = classnames.bind(styles);

function AdminOrders() {
  const statusList = ['pending', 'completed', 'canceled'];
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filterList, setFilterList] = useState({
    page: 1,
  });
  const [shoppingCarts, setShoppingCarts] = useState([]);
  useEffect(() => {
    axios.post('/api/shoppingcart/', { ...filterList }).then((response) => {
      setShoppingCarts((prev) => response.data.shoppingCarts);
      setTotal((prev) => response.data.total);
      setPerPage((prev) => response.data.perPage);
    });
  }, [filterList]);
  useEffect(() => {
    setTotalPage((prev) => Math.ceil(total / perPage));
  }, [total, perPage]);
  const createArrayPage = (totalPage, page) => {
    const numLeft = page > 2 ? 3 : page;
    const numRight = totalPage - page > 2 ? 2 : totalPage - page;
    const pageList = Array.from(Array.from(Array(totalPage).keys()));
    return pageList.slice(page - numLeft, page + numRight);
  };
  const nextPage = (totalPage, page) => {
    if (page + 1 <= totalPage)
      setFilterList((prev) => {
        return { ...prev, page: page + 1 };
      });
  };
  const prevPage = (page) => {
    if (page - 1 >= 1)
      setFilterList((prev) => {
        return { ...prev, page: page - 1 };
      });
  };
  const firstPage = () => {
    setFilterList((prev) => {
      return { ...prev, page: 1 };
    });
  };
  const lastPage = (totalPage) => {
    setFilterList((prev) => {
      return { ...prev, page: totalPage };
    });
  };
  const customTimestamp = (timestamp) => {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date(timestamp);
    return d.getDate() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear();
  };
  const filterStatusItem = (statusRemoved) => {
    return statusList.filter((a) => a !== statusRemoved);
  };
  const updateStatus = (id, status) => {
    axios
      .post('/api/shoppingcart/updateshoppingcart', { id, field: 'status', value: status })
      .then(() => {
        const index = shoppingCarts.findIndex((a) => a._id === id);
        setShoppingCarts((prev) => {
          prev[index].status = status;
          const newState = [...prev];
          return newState;
        });
      })
      .catch((err) => console.log(err));
  };
  const goToPage = (page) => {
    setFilterList((prev) => {
      return { ...prev, page };
    });
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('grid', 'wide', 'container')}>
        <div className={cx('orders-title', 'row')}>
          <div className={cx('orders-title-item', 'col', 'col-1-5')}>ORDER ID</div>
          <div className={cx('orders-title-item', 'col', 'col-2')}>ORDERED DATE</div>
          <div className={cx('orders-title-item', 'col', 'col-4')}>DETAIL</div>
          <div className={cx('orders-title-item', 'col', 'col-1-5')}>TOTAL ($)</div>
          <div className={cx('orders-title-item', 'col', 'col-1-5')}>STATUS</div>
          <div className={cx('orders-title-item', 'col', 'col-1-5')}></div>
        </div>
        <div className={cx('orders-body-wrapper')}>
          {shoppingCarts.map((shoppingCart, index) => {
            return (
              <div key={index} className={cx('orders-body', 'row', { 'dark-theme': index % 2 === 1 })}>
                <div className={cx('orders-body-item', 'orders-id', 'col', 'col-1-5')}>{shoppingCart._id}</div>
                <div className={cx('orders-body-item', 'col', 'col-2')}>{customTimestamp(shoppingCart.updatedAt)}</div>
                <div className={cx('orders-body-item', 'col', 'col-4')}>
                  {shoppingCart.product.name} ({shoppingCart.size}) x {shoppingCart.quantity}
                </div>
                <div className={cx('orders-body-item', 'col', 'col-1-5')}>
                  {shoppingCart.quantity * shoppingCart.product.price}
                </div>
                <div className={cx('orders-body-item', 'col', 'col-1-5')}>
                  <div className={cx('status', { [shoppingCart.status]: shoppingCart.status })}>
                    {shoppingCart.status}
                  </div>
                </div>
                <div className={cx('orders-body-item', 'col', 'col-1-5')}>
                  <div className={cx('status-wrapper')}>
                    <div className={cx('status-header')}>
                      Action <i className={cx('icon-arrow', 'dropdown-icon')}></i>
                      <div className={cx('status-options')}>
                        {filterStatusItem(shoppingCart.status).map((item, index) => {
                          return (
                            <div
                              key={index}
                              onClick={(e) => updateStatus(shoppingCart._id, item)}
                              className={cx('status-item')}
                            >
                              <div className={cx('status-color', { [item]: item })}></div>Mark as {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx('footer')}>
          <div className={cx('footer-info')}>
            Show {filterList.page} to {totalPage} of {total} entries
          </div>
          <div className={cx('page')}>
            {/* <div className={cx('page-dropdown')}>
              <div className={cx('page-dropdown-item')}>
                {totalPage}
                <i className={cx('icon-arrow', 'page-icon-dropdown')}></i>
              </div>
            </div> */}
            <div className={cx('page-list')}>
              <div onClick={(e) => firstPage()} className={cx('page-item')}>
                <i className={cx('icon-first')}></i>
              </div>
              <div onClick={(e) => prevPage(filterList.page)} className={cx('page-item')}>
                <i className={cx('icon-prev')}></i>
              </div>
              {createArrayPage(totalPage, filterList.page).map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => goToPage(item + 1)}
                    className={cx('page-item', { active: item + 1 === filterList.page })}
                  >
                    {item + 1}
                  </div>
                );
              })}
              <div onClick={(e) => nextPage(totalPage, filterList.page)} className={cx('page-item')}>
                <i className={cx('icon-next')}></i>
              </div>
              <div onClick={(e) => lastPage(totalPage)} className={cx('page-item')}>
                <i className={cx('icon-last')}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
