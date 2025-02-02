const express = require('express');
const adminController = require('../controller/adminController');
const authController = require('../controller/authController');

const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.protectByAdmin,
  adminController.getAdminDashBoard
);

router
  .route('/assign-task')
  .get(
    authController.protect,
    authController.protectByAdmin,
    adminController.getAssignTaskForm
  )
  .post(
    authController.protect,
    authController.protectByAdmin,
    adminController.assignTask
  );

router
  .route('/assign-task/:username?/:_id?')
  .get(
    authController.protect,
    authController.protectByAdmin,
    adminController.getAssignTaskForm
  );

router.get(
  '/all-user',
  authController.protect,
  authController.protectByAdmin,
  adminController.getAllUsers
);

router
  .route('/update/:_id')
  .get(
    authController.protect,
    authController.protectByAdmin,
    adminController.getUpdateform
  )
  .patch(
    authController.protect,
    authController.protectByAdmin,
    adminController.updateTask
  );

router
  .route('/delete/:_id')
  .get(
    authController.protect,
    authController.protectByAdmin,
    adminController.getDeleteForm
  )
  .delete(
    authController.protect,
    authController.protectByAdmin,
    adminController.deleteTask
  );

module.exports = router;
