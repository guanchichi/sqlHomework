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
<<<<<<< HEAD
};

// 刪除訂單資料
exports.addOrderRefund = async (req, res) => {
  const { CID, OProductNumber } = req.body;

  try {
    await user.addOrderRefund(CID, OProductNumber);
    res.json("刪除訂單資料成功")
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "刪除訂單失敗"});
  }
}


exports.getOrderByIdAndProductNumber = async (req, res) => {
  const { CID, OProductNumber } = req.body;

  try {
    const order = await user.getOrderByIdAndProductNumber(CID, OProductNumber);
    if (!order) {
        return res.status(404).json({ message: "找不到該訂單" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "獲取訂單失敗" });
  }
};
=======
};
>>>>>>> b871eb3e59740af310d663adde0ce9d7a67fab90
