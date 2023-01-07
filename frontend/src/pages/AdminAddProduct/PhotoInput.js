import styles from './AdminAddProduct.module.scss';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
const cx = classnames.bind(styles);

const PhotoInput = ({ file, setPhotos }) => {
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
    if (file) setImgSrc((prev) => URL.createObjectURL(file));
  }, [file]);
  const handleChangeImage = (e) => {
    setPhotos((prev) => [...prev, ...e.target.files]);
  };
  const handleResetFileValue = (e) => {
    e.target.value = null;
  };
  const handleDeletePhoto = (e, file) => {
    e.preventDefault();
    setPhotos((prev) => prev.filter((a) => a !== file));
  };
  return (
    <label className={cx('photo-input', 'col-3', 'col')}>
      <div className={cx('photo-input-container')}>
        {file && <i className={cx('icon-cross', 'close')} onClick={(e) => handleDeletePhoto(e, file)} />}
        {file && <img src={imgSrc} alt="preview" className={cx('photo-input-preview')} />}
        {!file && <i className={cx('icon-plus', 'photo-input-add')} />}
        {!file && <div className={cx('photo-input-title')}>Add photo</div>}
        <input
          className={cx('photo-input-body')}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleChangeImage}
          onClick={handleResetFileValue}
          multiple
        />
      </div>
    </label>
  );
};

export default PhotoInput;
