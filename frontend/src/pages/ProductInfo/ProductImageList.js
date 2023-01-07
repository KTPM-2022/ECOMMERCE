import styles from './ProductInfo.module.scss';
import classnames from 'classnames/bind';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Link } from 'react-router-dom';
const cx = classnames.bind(styles);

function ProductImageList({ photos, setMainImg, ids }) {
  if (photos.length > 4) photos = photos.slice(0, 4);
  if (ids?.length > 4) ids = ids.slice(0, 4);
  let changeMainImg = () => {};
  if (setMainImg) {
    changeMainImg = (e, photo) => {
      setMainImg((prev) => photo);
    };
  }
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME_CLOUDINARY,
    },
  });
  return (
    <div className={cx('product-img-list')}>
      {photos.map((photo, index) => {
        if (!ids)
          return (
            <div key={index} className={cx('product-img-item-wrapper')}>
              <AdvancedImage onClick={e=>changeMainImg(e,photo)} cldImg={cld.image(photo)} className={cx('product-img-item')} />
            </div>
          );
        else
          return (
            <Link key={index} to={`/productinfo/${ids[index]}`}>
              <div className={cx('product-img-item-wrapper')}>
                <AdvancedImage cldImg={cld.image(photo)} className={cx('product-img-item')} />
              </div>
            </Link>
          );
      })}
    </div>
  );
}

export default ProductImageList;
