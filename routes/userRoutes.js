const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.protectByUser,
  userController.getUserDashboard
);

router.get(
  '/status-update/:_id',
  authController.protect,
  authController.protectByUser,
  userController.getStatusUpdate
);
router.patch(
  '/status-update/:_id',
  authController.protect,
  authController.protectByUser,
  userController.statusUpdate
);

module.exports = router;
