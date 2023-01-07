import styles from './Modal.module.scss';
import classnames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, closeModal } from 'src/features/modal/modalSlice';
import { setError, clearError } from 'src/features/auth/authSlice';
import { useForm } from 'react-hook-form';
import FormGroup from 'src/components/FormGroup';
import Button from 'src/components/Button';
const cx = classnames.bind(styles);

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'all',
  });
  const errormsg = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [successmsg, setSuccessmsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    axios
      .post('/api/auth/forgotpassword', formData)
      .then(() => {
        dispatch(clearError());
        setSuccessmsg('Please check your email to get reset password link');
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
          <span className={cx('title')}>Forgot Password</span>
          <span className={cx('instruction')}>Enter your e-mail address below and we’ll get you back on track.</span>
          <span className={cx('success')}>{successmsg}</span>
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
        <Button primary disabled={!isValid || !isDirty} className={cx('submit')} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <div className={cx('footer')}>
          I remember my password now.
          <span
            className={cx('link')}
            onClick={() => {
              dispatch(showModal('login'));
              dispatch(clearError());
            }}
          >
            Log in?
          </span>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
