import styles from './AdminProducts.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import Button from 'src/components/Button';
const cx = classnames.bind(styles);

function AdminProducts() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME_CLOUDINARY,
    },
  });
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Math.ceil(total / perPage));
  const [filterList, setFilterList] = useState({
    page: 1,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.post('/api/product/getproductadmin', { ...filterList }).then((response) => {
      setProducts((prev) => response.data.products);
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
  const goToPage = (page) => {
    setFilterList((prev) => {
      return { ...prev, page };
    });
  };
  const removeProduct = (id) => {
    axios.delete('/api/product/deleteproduct', {data: {id}})
    .then(() => {
      setProducts((prev) => {
        return prev.filter(a=>a._id!==id);
      });
    })
    .catch((err) => console.log(err));
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('grid', 'wide', 'container')}>
      <Link to={`/admin/addproduct`}><Button className={cx("add-product-btn")}primary><i className={cx("icon-plus")}/>Add product</Button></Link>
        <div className={cx('products-title', 'row')}>
          <div className={cx('products-title-item', 'col', 'col-4')}>Products</div>
          <div className={cx('products-title-item', 'col', 'col-2')}>Sold</div>
          <div className={cx('products-title-item', 'col', 'col-2')}>Date added</div>
          <div className={cx('products-title-item', 'col', 'col-2')}>Profit ($)</div>
          <div className={cx('products-title-item', 'col', 'col-2')}></div>
        </div>
        <div className={cx('products-body-wrapper')}>
          {products.map((product, index) => {
            return (
              <div key={index} className={cx('products-body', 'row', { 'dark-theme': index % 2 === 1 })}>
                <div className={cx('products-body-item', 'col', 'col-4')}>
                  <div className={cx('product-info-wrapper')}>
                    <AdvancedImage className={cx('product-img')} cldImg={cld.image(product.photos[0])} />
                    <div className={cx('product-info')}>
                      <div className={cx('product-name')}>{product.name}</div>
                      <div className={cx('product-category')}>
                        {product.gender} , {product.categories[0]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('products-body-item', 'col', 'col-2')}>
                  {product.totalQuantity}/{product.quantity}
                </div>
                <div className={cx('products-body-item', 'col', 'col-2')}>{customTimestamp(product.updatedAt)}</div>
                <div className={cx('products-body-item', 'col', 'col-2')}>{product.totalQuantity * product.price}</div>
                <div className={cx('products-body-item', 'col', 'col-2')}>
                  <div className={cx('action-wrapper')}>
                    <div className={cx('action-header')}>
                      Action <i className={cx('icon-arrow', 'dropdown-icon')}></i>
                      <div className={cx('action-options')}>
                        <Link to={`/admin/addproduct?id=${product._id}&mode=update`} className={cx('action-item')}>
                          <i className={cx('icon-edit', 'action-icon')} />
                          <div className={cx('action-name')}>Edit</div>
                        </Link>
                        <div className={cx('action-item')} onClick={(e) => removeProduct(product._id)}>
                          <i className={cx('icon-remove', 'action-icon')} />
                          <div className={cx('action-name')}>Remove</div>
                        </div>
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

export default AdminProducts;
