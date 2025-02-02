const express = require('express');
const apiController = require('../controller/apiController');
const authController = require('../controller/authController');

const router = express.Router();

router.get(
  '/admin/get-all-user',
  authController.protect,
  apiController.getAllUser
);
router.get(
  '/admin/get-task-by-id/:_id',
  authController.protect,
  apiController.getTaskById
);

router.get(
  '/user/get-tasks-by-user',
  authController.protect,
  apiController.getAllTaskByUser
);

module.exports = router;
