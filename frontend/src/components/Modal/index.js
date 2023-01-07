import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

function Modal() {
  const modalType = useSelector((state) => state.modal.value);
  let Modal = Fragment;
  switch (modalType) {
    case 'register':
      Modal = Register;
      break;
    case 'login':
      Modal = Login;
      break;
    case 'forgotpassword':
      Modal = ForgotPassword;
      break;
    default:
      Modal = Fragment;
  }
  return <Modal />;
}

export default Modal;
