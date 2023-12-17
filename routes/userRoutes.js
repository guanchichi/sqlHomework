// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/users/searchByID', userController.getUserByID); // 用ID找使用者
router.post('/users/deleteByID', userController.updateConsumptionStatusByID); // 刪除使用者資料(改為停用)
router.post('/users/updateData', userController.updateUserByID); // 更新使用者資料
router.post('/users/orders/record', userController.addOrderRecord); // 訂貨
router.post('/users/orders/refund', userController.addOrderRefund); // 退貨
router.post('/users/orders/find', userController.getOrderByIdAndProductNumber); // 用ID以及產品編號尋找訂單
router.post('/suppliercompany', userController.addSupplierCompany); // 新增供應商
router.post("/supply", userController.addsupply); // 新增進貨
router.get('/orders', userController.getAllOrders); // 獲取所有訂單
router.get("/product", userController.getAllproduct); // 獲取所有產品
router.get("/refundorders", userController.getAllrefundorders); // 獲取所有退貨訂單
router.get("/suppliercompany", userController.getAllsuppliercompany); // 獲取所有供應商資料
router.get("/supply", userController.getAllsupply); // 獲取所有進貨資料

// 測試用
router.post('/users/deleteByIDd', userController.updateConsumptionStatusByIDd);

module.exports = router;
