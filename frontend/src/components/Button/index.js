import styles from './Button.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

function Button({
  children,
  className,
  primary = false,
  secondary = false,
  third = false,
  fourth = false,
  disabled = false,
  onClick,
  ...passProps
}) {
  const classes = cx({
    [className]: className,
    primary,
    secondary,
    third,
    fourth,
    disabled,
  });
  const props = {
    onClick,
    ...passProps,
  };

  return (
    <button className={classes} {...props} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
