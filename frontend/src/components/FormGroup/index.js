import styles from './FormGroup.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function FormGroup({ label, name, placeholder, type, value, handleChange, register, errors }) {
  let options = {};
  switch (name) {
    case 'email':
      options = {
        required: {
          value: true,
          message: 'Please add this field!',
        },
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Please enter a valid e-mail!',
        },
      };
      break;
    case 'password':
    case 'newpassword':
      options = {
        required: {
          value: true,
          message: 'Please add this field!',
        },
        minLength: {
          value: 6,
          message: 'Your passwords must be more than 6 characters!',
        },
      };
      break;
    default:
      options = {
        required: {
          value: true,
          message: 'Please add this field!',
        },
      };
  }
  const handleChangeInput = (e) => {
    registerProp.onChange(e);
    handleChange(e);
  };

  const handleBlurInput = (e) => {
    registerProp.onBlur(e);
  };
  const registerProp = register(name, options);
  return (
    <div className={cx('form-group')}>
      <label className={cx('label')}>{label}</label>
      <input
        {...registerProp}
        name={name}
        className={cx('input')}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
      />
      {errors[name] && <span className={cx('error')}>{errors[name].message}</span>}
    </div>
  );
}

export default FormGroup;
