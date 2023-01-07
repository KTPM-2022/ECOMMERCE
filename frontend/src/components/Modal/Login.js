import styles from './Modal.module.scss';
import classnames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'src/features/auth/authSlice';
import { showModal, closeModal } from 'src/features/modal/modalSlice';
import { setError, clearError } from 'src/features/auth/authSlice';
import { useForm } from 'react-hook-form';
import FormGroup from 'src/components/FormGroup';
import Button from 'src/components/Button';
const cx = classnames.bind(styles);

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'all',
  });
  const dispatch = useDispatch();
  const errormsg = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    axios
      .post('/api/auth/login', formData)
      .then(() => {
        dispatch(clearError());
        dispatch(getUser());
        dispatch(closeModal());
      })
      .catch((err) => {
        dispatch(setError(err.response.data));
      });
  };

  const handleCloseModal = (e) => {
    dispatch(closeModal());
    dispatch(clearError());
  };

  return (
    <div className={cx('wrapper')} onClick={handleCloseModal}>
      <form
        className={cx('container')}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <i className={cx('close', 'icon-cross')} onClick={handleCloseModal} />

        <div className={cx('header')}>
          <span className={cx('title')}>Login</span>
          <span className={cx('error', 'error-header')}>{errormsg}</span>
        </div>
        <FormGroup
          label="EMAIL"
          name="email"
          placeholder="Enter your email..."
          type="email"
          value={formData.email}
          handleChange={handleChange}
          register={register}
          errors={errors}
        />
        <FormGroup
          label="PASSWORD"
          name="password"
          placeholder="Enter your password..."
          type="password"
          value={formData.password}
          handleChange={handleChange}
          register={register}
          errors={errors}
        />
        <div className={cx('choice')}>
          <div className={cx('remember-password')}>
            <input type="checkbox" className={cx('check-box')} />
            <span>Remember password</span>
          </div>
          <span className={cx('forgot-password')} onClick={() => dispatch(showModal('forgotpassword'))}>
            Forgot your password?
          </span>
        </div>
        <Button primary disabled={!isDirty || !isValid} className={cx('submit')} onClick={handleSubmit(onSubmit)}>
          Log in
        </Button>
        <div className={cx('footer')}>
          Don't you have an account?
          <span
            className={cx('link')}
            onClick={() => {
              dispatch(showModal('register'));
              dispatch(clearError());
            }}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
