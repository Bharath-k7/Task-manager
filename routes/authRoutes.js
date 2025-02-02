const express = require('express');
const authContoller = require('../controller/authController');

const router = express.Router();

router
  .route('/create-user')
  .get(authContoller.getSignUpForm)
  .post(authContoller.createUser);

router
  .route('/login')
  .get(authContoller.getLoginForm)
  .post(authContoller.login);

router.get('/logout', authContoller.protect, authContoller.logout);

router.get('/login-with-otp', authContoller.getLoginWithOTPForm);
router.get('/login-with-otp/send-otp', authContoller.sendOTP);

module.exports = router;
