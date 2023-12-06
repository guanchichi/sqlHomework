// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.post('/users/searchByID', userController.getUserByID);
router.post('/users/deleteByID', userController.updateConsumptionStatusByID);
router.post('/users/:ID', userController.updateUserByID);

module.exports = router;
