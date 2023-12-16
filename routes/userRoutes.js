// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/users/searchByID', userController.getUserByID);
router.post('/users/deleteByID', userController.updateConsumptionStatusByID);
router.post('/users/:ID', userController.updateUserByID);
router.post('/users/orders/record', userController.addOrderRecord); // 訂貨
router.post('/users/orders/refund', userController.addOrderRefund); // 退貨
router.post('/users/orders/find', userController.getOrderByIdAndProductNumber); // 尋找訂單


module.exports = router;
