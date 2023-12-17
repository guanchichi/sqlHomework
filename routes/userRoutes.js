// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers); // 獲取所有使用者
router.post('/users', userController.createUser); // 新增使用者
router.post('/users/searchByID', userController.getUserByID); // 用ID找使用者
router.post('/users/deleteByID', userController.updateConsumptionStatusByID); // 刪除使用者資料(改為停用)
router.post('/users/updateData', userController.updateUser); // 更新使用者資料
router.get('/orders', userController.getAllOrders); // 獲取所有訂單
router.post('/users/orders/record', userController.addOrderRecord); // 訂貨
router.post('/users/orders/refund', userController.addOrderRefund); // 退貨
router.post('/users/orders/find', userController.getOrderByIdAndProductNumber); // 用ID以及產品編號尋找訂單
router.post('/suppliercompany', userController.addSupplierCompany); // 新增供應商
router.get("/suppliercompany", userController.getAllsuppliercompany); // 獲取所有供應商資料
router.post("/suppliercompany/ByNumber", userController.getSupplierCompanyBySupplierNumber); // 根據供應商編號搜尋供應商
router.post("/supply", userController.addsupply); // 新增進貨
router.get("/supply", userController.getAllsupply); // 獲取所有進貨資料
router.get("/product", userController.getAllproduct); // 獲取所有產品
router.post("/product", userController.addProduct); // 新增貨品
router.get("/refundorders", userController.getAllrefundorders); // 獲取所有退貨訂單


module.exports = router;
