const express = require('express');
const router = express.Router();
const {
  register,
  verifyAccount,
  login,
  forgotPassword,
  checkToken,
  logout,
  createNewPassword,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/logout', logout);
router.post('/checktoken', checkToken);
router.post('/createnewpassword', createNewPassword);
router.post('/verifyaccount', verifyAccount);

module.exports = router;
