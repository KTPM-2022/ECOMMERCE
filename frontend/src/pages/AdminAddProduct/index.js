import styles from './AdminAddProduct.module.scss';
import axios from 'axios';
import classnames from 'classnames/bind';
import FieldWrapper from './FieldWrapper';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from './Dropdown';
import Button from 'src/components/Button';
import PhotoList from './PhotoList';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classnames.bind(styles);

function AdminAddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const id = new URLSearchParams(search).get('id');
  let mode = new URLSearchParams(search).get('mode');
  if (!mode) mode = 'add';
  const productCategory = useSelector((state) => state.productCategory.value);
  const [photos, setPhotos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    gender: '',
    type: '',
    name: '',
    categories: [],
    brand: '',
    price: '',
    size: [],
    colors: [],
    quantity: '',
    description: '',
  });
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    photos.forEach((value) => {
      data.append('file', value);
    });
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (mode === 'add') {
      axios
        .post('/api/product/addproduct', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          setErrorMsg(prev=>'');
        })
        .catch((err) => setErrorMsg(prev=>err.response.data));
    } else if (mode === 'update' && id) {
      data.append('id', id);
      axios
        .put('/api/product/updateproduct', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          navigate('/admin/products');
        })
        .catch((err) => setErrorMsg(prev=>err.response.data));
    }
  };

  useEffect(() => {
    if (mode === 'update' && id) {
      axios.post('/api/product/getproductinfo', { id }).then((response) => {
        const { _id, updatedAt, createdAt, photos, __v, ...rest } = response.data;
        setFormData((prev) => rest);
      });
    }
  }, []);

  const checkInputOnlyAcceptNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) handleChange(e);
  };
  return (
    <div className={cx('wrapper')}>
      <form className={cx('container')}>
        <FieldWrapper title="PHOTOS">
          <PhotoList photos={photos} setPhotos={setPhotos} />
          <div className={cx('instruction')}>
            You can add up to 8 photos. The 1st photo will be set as cover (main photo).
          </div>
        </FieldWrapper>
        <FieldWrapper><span className={cx("error")}>{errorMsg}</span></FieldWrapper>
        <FieldWrapper title="GENDER">
          <Dropdown
            defaultValue={formData.gender}
            setFormData={setFormData}
            field="gender"
            values={productCategory.map((value, index) => value.gender)}
          />
        </FieldWrapper>
        <FieldWrapper title="TYPE">
          <Dropdown
            parent={[formData.gender]}
            defaultValue={formData.type}
            setFormData={setFormData}
            field="type"
            values={
              productCategory?.find((a) => a.gender === formData.gender)?.typeValue
                ? productCategory
                    .find((a) => a.gender === formData.gender)
                    .typeValue.map((value, index) => {
                      return value.name;
                    })
                : []
            }
          />
        </FieldWrapper>
        <FieldWrapper title="NAME">
          <input className={cx('field-input')} name="name" value={formData.name} onChange={handleChange} />
        </FieldWrapper>
        <FieldWrapper title="CATEGORIES">
          <Dropdown
            parent={[formData.gender, formData.type]}
            defaultValue={formData.categories}
            setFormData={setFormData}
            field="categories"
            values={
              productCategory
                ?.find((a) => a.gender === formData.gender)
                ?.typeValue.find((a) => a.name === formData.type)?.categories
                ? productCategory
                    .find((a) => a.gender === formData.gender)
                    .typeValue.find((a) => a.name === formData.type)
                    .categories.map((value, index) => {
                      return value;
                    })
                : []
            }
            multiplechoice
          />
        </FieldWrapper>
        <FieldWrapper title="BRAND">
          <Dropdown setFormData={setFormData} defaultValue={formData.brand} field="brand" values={['Zara', 'H&M', 'Pull&Bear', 'Dior', 'Chanel']} />
        </FieldWrapper>
        <FieldWrapper title="PRICE ($)">
          <input
            className={cx('field-input')}
            type="text"
            name="price"
            value={formData.price}
            onChange={checkInputOnlyAcceptNumber}
          />
        </FieldWrapper>
        <FieldWrapper title="SIZE">
          <Dropdown setFormData={setFormData} defaultValue={formData.size} field="size" values={['S', 'M', 'L', 'XL']} multiplechoice />
        </FieldWrapper>
        <FieldWrapper title="COLORS">
          <Dropdown
            setFormData={setFormData}
            defaultValue={formData.colors}
            field="colors"
            values={['Blue', 'Brown', 'Red', 'Black']}
            multiplechoice
          />
        </FieldWrapper>
        <FieldWrapper title="QUANTITY">
          <input
            className={cx('field-input')}
            name="quantity"
            type="text"
            onChange={checkInputOnlyAcceptNumber}
            value={formData.quantity}
          />
        </FieldWrapper>
        <FieldWrapper title="DESCRIPTION">
          <input
            className={cx('field-input')}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FieldWrapper>
        <div className={cx('submit')}>
          <Button className={cx('form-button')} secondary>
            Cancel
          </Button>
          <Button className={cx('form-button')} onClick={handleSubmit} primary>
            Complete
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminAddProduct;
