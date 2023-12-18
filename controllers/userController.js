const UserModel = require("../models/UserModel");

const user = new UserModel();

// 取得所有客戶資料
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
  console.log(newUser);

  user.createUser(newUser, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: "新增使用者失敗" });
      throw error;
    }
    res.json({ message: "使用者新增成功" });
  });
};

// 以身分證字號查詢使用者
exports.getUserByID = async (req, res) => {
  try {
      const { ID } = req.body;
      const userData = await user.getUserByID(ID);
      res.json(userData);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// // 用ID更新客戶資料
// exports.updateUserByID = (req, res) => {
//     const { ID } = req.body;
//     const { updatedData } = req.body;
  
//     user.updateUserByID(ID, updatedData, (error, results, fields) => {
//       if (error) {
//         res.status(500).json({ error: "更新使用者資料失敗" });
//         throw error;
//       }
//       res.json({ message: "使用者資料更新成功" });
//     });
//   };


// 刪除資料：將資料之消費狀態由「正常」改成「停用」
exports.updateConsumptionStatusByID = (req, res) => {
  const { ID } = req.body;
  const { ConsumptionStatus } = req.body;
  user.updateConsumptionStatusByID(ID, ConsumptionStatus, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: "更新消費狀態失敗" });
      throw error;
    }
    res.json({ message: "消費狀態更新成功" });
  });
};

// 用ID更新客戶資料
exports.updateUser = async (req, res) => {
  const { ID, Cname, PhoneNumber, Address, Age, Occupation, RegisterDate, Photo, ConsumptionStatus, AmountToBeCollected, ReceivableDate, ReceivableAmount } = req.body;

  try {
    const result = await user.updateUserByID(ID, Cname, PhoneNumber, Address, Age, Occupation, RegisterDate, Photo, ConsumptionStatus, AmountToBeCollected, ReceivableDate, ReceivableAmount);
    res.json({ message: 'User updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// 新增訂單資料用async, await
exports.addOrderRecord = async (req, res) => {
  const { CID, OProductNumber, Unit, UnitPrice, OrderDate, EstimatedDeliveryDate, ActualDeliveryDate, Quantity, orderStatus} = req.body;
  const orderData = {
    CID, 
    OProductNumber, 
    Unit, 
    UnitPrice, 
    OrderDate, 
    EstimatedDeliveryDate, 
    ActualDeliveryDate, 
    Total: UnitPrice*Quantity, 
    Quantity, 
    orderStatus
  };

  try {
    await user.addOrderRecord(orderData);
    res.json({message: "訂單記錄新增成功"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "訂單記錄新增失敗"});
  }
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

// 根據ID及產品編號獲取訂單
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

// 新增貨品
exports.addProduct = async (req, res) => {
  const { ProductName, SupplierName, ProductNumber } = req.body;

  const ProductData = {
    ProductName,
    SupplierName,
    ProductNumber
  };

  try {
    await user.addProduct(ProductData);
    res.json({ message: "新增貨品成功"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "新增貨品失敗"})
  }
}

// 新增進貨資料
exports.addsupply = async (req, res) => {
  const { TProductNumber, TSupplierNumber, RestockUnit, RestockUnitPrice, RestockProductName, RestockSpecification, RestockLocation, RestockDate, RestockQuantity} = req.body;
  const supplyData = {
    TProductNumber, 
    TSupplierNumber, 
    RestockUnit, 
    RestockUnitPrice, 
    RestockProductName, 
    RestockSpecification, 
    RestockLocation, 
    RestockDate, 
    RestockQuantity
  }

  try {
    const ProductNumber = await user.getProductByProductNumber(supplyData.OProductNumber);
    const SupplierNumber = await user.getSupplierCompanyBySupplierNumber(supplyData.TSupplierNumber);
    if (!ProductNumber){
      return res.status(404).json({ message: "產品不存在"});
    } else if (!SupplierNumber){
      return res.status(404).json({ message: "供應商不存在"});
    } else {
      // 呼叫 usermodel.js 中的 addsupply 函式，將進貨資料新增至資料庫中
      await user.addsupply(supplyData);
      res.json({ message: "新增進貨成功" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "新增進貨失敗" });
  }
}


// 新增供應商資料用async, await
exports.addSupplierCompany = async (req, res) => {
  const CompanyData = req.body;
  try {
    await user.addSupplierCompany(CompanyData);
    res.json({message: "供應商資料新增成功"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "供應商資料新增失敗"});
  }
};

// 藉由供應商編號獲得供應商資料
exports.getSupplierCompanyBySupplierNumber = async (req, res) => {
  const { SupplierNumber } = req.body;

  try {
    const results = await user.getSupplierCompanyBySupplierNumber(SupplierNumber);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 取得所有訂單資料
exports.getAllOrders = async (req, res) => {
  try {
    const ordersData = await user.getAllOrders();
    res.json(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "獲取訂單失敗" });
  }
};

// 取得所有產品
exports.getAllproduct = async (req, res) => {
  try {
    const product = await user.getAllproduct();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "獲取訂單失敗" });
  }
};

// 取得所有退貨訂單
exports.getAllrefundorders = async (req, res) => {
  try {
    const refundorders = await user.getAllrefundorders();
    res.json(refundorders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "獲取訂單失敗" });
  }
};

// 取得所有供應商資料
exports.getAllsuppliercompany = async (req, res) => {
  try {
    const suppliercompany = await user.getAllsuppliercompany();
    res.json(suppliercompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "獲取訂單失敗" });
  }
};

exports.getAllsupply = async (req, res) => {
  try {
    const supply = await user.getAllsupply();
    res.json(supply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "獲取訂單失敗" });
  }
};
