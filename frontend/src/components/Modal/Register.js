import styles from './Modal.module.scss';
import classnames from 'classnames/bind';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, closeModal } from 'src/features/modal/modalSlice';
import { setError, clearError } from 'src/features/auth/authSlice';
import FormGroup from 'src/components/FormGroup';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
const cx = classnames.bind(styles);

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'all',
  });
  const [successmsg, setSuccessmsg] = useState('');
  const errormsg = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
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
      .post('/api/auth/register', formData)
      .then(() => {
        dispatch(clearError());
        setSuccessmsg('Please check your email to verify your account');
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
          <span className={cx('title')}>Register</span>
          <span className={cx('error', 'error-header')}>{errormsg}</span>
          <span className={cx('success')}>{successmsg}</span>
        </div>

        <FormGroup
          label="NAME"
          name="name"
          placeholder="Enter your name..."
          type="text"
          value={formData.name}
          handleChange={handleChange}
          register={register}
          errors={errors}
        />
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
        <span className={cx('policy')}>
          By creating an account you agree to the{' '}
          <Link className={cx('link')} to="/">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className={cx('link')} to="/">
            Privacy Policy
          </Link>
        </span>
        <Button primary disabled={!isDirty || !isValid} className={cx('submit')} onClick={handleSubmit(onSubmit)}>
          Register
        </Button>
        <div className={cx('footer')}>
          Do you have an account?{' '}
          <span
            className={cx('link')}
            onClick={() => {
              dispatch(showModal('login'));
              dispatch(clearError());
            }}
          >
            Log in
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
