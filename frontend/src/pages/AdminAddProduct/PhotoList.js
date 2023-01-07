import styles from './AdminAddProduct.module.scss';
import classnames from 'classnames/bind';
import PhotoInput from './PhotoInput';
const cx = classnames.bind(styles);

const PhotoList = ({ photos, setPhotos }) => {
  if (photos.length > 8) setPhotos((prev) => prev.slice(0, 8));
  return (
    <div className={cx('photo-list', 'row')}>
      {photos.map((photo, index) => {
        return <PhotoInput key={index} file={photo} setPhotos={setPhotos} />;
      })}
      {photos.length < 8 && <PhotoInput file={null} setPhotos={setPhotos} />}
    </div>
  );
};

export default PhotoList;
