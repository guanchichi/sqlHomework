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
<<<<<<< HEAD
router.post('/users/orders/refund', userController.addOrderRefund); // 退貨
router.post('/users/orders/find', userController.getOrderByIdAndProductNumber); // 尋找訂單
=======
>>>>>>> b871eb3e59740af310d663adde0ce9d7a67fab90

module.exports = router;
