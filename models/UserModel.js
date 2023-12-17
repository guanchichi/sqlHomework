const mysql = require('mysql');

class UserModel {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'chichi77',
            database: 'fooddelivery'
        });
    }

    getAllUsers(callback) {
        this.connection.query('SELECT * FROM client', callback);
    }

    async getUserByID(ID) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM client WHERE ID = ?', [ID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }        

    createUser(newUser, callback) {
        this.connection.query('INSERT INTO client SET ?', newUser, callback);
    }

    updateUserByID(ID, updatedData, callback) {
        console.log("1d278");
        console.log(updatedData);
        console.log(ID);
        console.log("1d278");
        this.connection.query('UPDATE client SET ? WHERE ID = ?', [updatedData, ID], callback);
    }
    
    updateConsumptionStatusByID(ID, newStatus, callback) {
        this.connection.query('UPDATE client SET ConsumptionStatus = ? WHERE ID = ?', [newStatus, ID], callback);
    }

    // 取得所有訂單資料
    async getAllOrders() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM orders', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // 取得所有產品
    async getAllproduct() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM product', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // 獲取所有refundorders
    async getAllrefundorders() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM refundorders', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // 獲取所有供應商
    async getAllsuppliercompany() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM suppliercompany', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // 獲取所有進貨資料
    async getAllsupply() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM supply', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    

    // 其他操作...
    // 新增訂單資料async, await
    addOrderRecord = async (RecordData) => {
        try {
          const UserData = await this.getUserByID(RecordData.CID);
          const results = await this.connection.query('INSERT INTO orders SET ?', [RecordData]);
          const updateAmount = {
            "AmountToBeCollected": RecordData.Total + UserData.AmountToBeCollected
          }
          console.log(updateAmount);
          console.log(RecordData.CID);
          await this.updateUserByID(RecordData.CID, updateAmount);
          return results;
        } catch (error) {
          throw error;
        }
    };

    // 放進refundOrder table中
    insertRefundOrder = (RefundOrder) => {
        return new Promise((reslove, reject) => {
            this.connection.query('INSERT INTO RefundOrders SET ?', RefundOrder, (error, results, fields) => {
                if (error) reject(error);
                reslove(results);
            });
        });
    };

    // 刪除訂單
    addOrderRefund = async (CID, OProductNumber) => {
        try {
            const OriginalOrder = (await this.getOrderByIdAndProductNumber(CID, OProductNumber))[0];
            const RefundOrder = {
                "CID": OriginalOrder.CID,
                "OProductNumber": OriginalOrder.OProductNumber,
                "Unit": OriginalOrder.Unit,
                "UnitPrice": OriginalOrder.UnitPrice,
                "OrderDate": OriginalOrder.OrderDate,
                "EstimatedDeliveryDate": OriginalOrder.EstimatedDeliveryDate,
                "ActualDeliveryDate": OriginalOrder.ActualDeliveryDate,
                "Total": -(OriginalOrder.Total),
                "Quantity": OriginalOrder.Quantity,
                "orderStatus": "退費"
            }
            await this.insertRefundOrder(RefundOrder);
            console.log('Refund order added successfully');
        } catch (error) {
            console.error('Error adding refund order:', error);
            throw error;
        }
    };

    // 用ID以及產品編號找訂單
    async getOrderByIdAndProductNumber(CID, OProductNumber) {
        return new Promise((reslove, reject) => {
            this.connection.query('SELECT * FROM orders WHERE CID = ? AND OProductNumber = ?', [CID, OProductNumber], (error, results) => {
                if (error){
                    return reject(error);
                }
                reslove(results);
            });
        });
    }

    async getProductByProductNumber(ProductNumber) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM product WHERE ProductNumber = ?', [ProductNumber], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
    
    async getSupplierCompanyBySupplierNumber(SupplierNumber) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM suppliercompany WHERE SupplierNumber = ?', [SupplierNumber], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
    

    // 新增供應商
    addSupplierCompany = async (CompanyData) => {
        try {
            const query = 'INSERT INTO suppliercompany SET ?';
            const results = await this.connection.query(query, [CompanyData]);
            return results;
        } catch (error) {
            throw error;
        }
    }
    
    addsupply = async (supplyData) => {
        try {
          const query = 'INSERT INTO supply SET ?';
          const result = await this.connection.query(query, supplyData);
          return result;
        } catch (error) {
          throw error;
        }
    }
      

    closeConnection() {
        this.connection.end();
    }
}

module.exports = UserModel;
