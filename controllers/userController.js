// controllers/userController.js

const UserModel = require("../models/UserModel");

const user = new UserModel();

exports.getAllUsers = (req, res) => {
  user.getAllUsers((error, results, fields) => {
    if (error) {
      res.status(500).json({ error: "資料庫查詢失敗" });
      throw error;
    }
    res.json(results);
  });
};

// 新增使用者資料
exports.createUser = (req, res) => {
  const newUser = req.body;

  user.createUser(newUser, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: "新增使用者失敗" });
      throw error;
    }
    res.json({ message: "使用者新增成功" });
  });
};

// 以身分證字號查詢使用者
exports.getUserByID = (req, res) => {
    const { ID } = req.body;

    user.getUserByID(ID, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: "查詢使用者資料失敗" });
            throw error;
        }

        if (!results || results.length === 0) {
            res.status(404).json({ message: "找不到使用者資料" });
            return;
        }
        res.json(results[0]);
    });
};

exports.updateUserByID = (req, res) => {
    const { ID } = req.params;
    const { updatedData } = req.body;
  
    user.updateUserByID(ID, updatedData, (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: "更新使用者資料失敗" });
        throw error;
      }
      res.json({ message: "使用者資料更新成功" });
    });
  };


// 刪除資料：係將資料之消費狀態由「正常」改成「停用」
exports.updateConsumptionStatusByID = (req, res) => {
  const { ID } = req.params;
  const { newStatus } = req.body;

  user.updateConsumptionStatusByID(ID, newStatus, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: "更新消費狀態失敗" });
      throw error;
    }
    res.json({ message: "消費狀態更新成功" });
  });
};

exports.updateUserByID = (req, res) => {
  const { ID } = req.params;
  const { updatedData } = req.body;

  user.updateUserByID(ID, updatedData, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: "更新使用者資料失敗" });
      throw error;
    }
    res.json({ message: "使用者資料更新成功" });
  });
};

// 新增訂單資料用async, await
exports.addOrderRecord = async (req, res) => {
  const orderData = req.body;
  try {
    await user.addOrderRecord(orderData);
    res.json({message: "訂單記錄新增成功"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "訂單記錄新增失敗"});
  }
};