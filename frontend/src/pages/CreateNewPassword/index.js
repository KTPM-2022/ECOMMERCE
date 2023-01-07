import styles from './CreateNewPassword.module.scss';
import classnames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setError, clearError } from 'src/features/auth/authSlice';
import { useForm } from 'react-hook-form';
import FormGroup from 'src/components/FormGroup';
import Button from 'src/components/Button';
const cx = classnames.bind(styles);

function CreateNewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'all',
  });
  const [successmsg, setSuccessmsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const token = new URLSearchParams(search).get('token');
  const errormsg = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    newpassword: '',
  });

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    axios.post('/api/auth/checktoken', { token }).catch((error) => {
      navigate('/');
    });
  }, [token]);

  const onSubmit = (e) => {
    axios
      .post('/api/auth/createnewpassword', { token, ...formData })
      .then(() => {
        dispatch(clearError());
        setSuccessmsg('Your password has been changed successfully. Please log in again');
      })
      .catch((error) => {
        dispatch(setError(error.response.data));
      });
  };

  return (
    <div className={cx('wrapper')}>
      <form
        className={cx('container')}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={cx('header')}>
          <span className={cx('title')}>Create new password</span>
          <span className={cx('success')}>{successmsg}</span>
          <span className={cx('error', 'error-header')}>{errormsg}</span>
        </div>
        <FormGroup
          label="NEW PASSWORD"
          name="newpassword"
          placeholder="Enter your new password..."
          type="password"
          value={formData.newpassword}
          handleChange={handleChange}
          errormsg="wrong"
          register={register}
          errors={errors}
        />
        <Button primary disabled={!isValid || !isDirty} className={cx('submit')} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateNewPassword;
