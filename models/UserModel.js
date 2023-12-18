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

    // 取得所有客戶資料
    getAllUsers(callback) {
        this.connection.query('SELECT * FROM client', callback);
    }

    // 用ID取得客戶資料
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

    // 新增客戶資料
    createUser(newUser, callback) {
        this.connection.query('INSERT INTO client SET ?', newUser, callback);
    }

    // 用ID更新客戶資料
    updateUserByID(ID, Cname, PhoneNumber, Address, Age, Occupation, RegisterDate, Photo, ConsumptionStatus, AmountToBeCollected, ReceivableDate, ReceivableAmount, callback) {
        const updatedData = {
            Cname: Cname,
            PhoneNumber: PhoneNumber,
            Address: Address,
            Age: Age,
            Occupation: Occupation,
            RegisterDate: RegisterDate,
            Photo: Photo,
            ConsumptionStatus: ConsumptionStatus,
            AmountToBeCollected: AmountToBeCollected,
            ReceivableDate: ReceivableDate,
            ReceivableAmount: ReceivableAmount
        };
    
        this.connection.query('UPDATE client SET ? WHERE ID = ?', [updatedData, ID], callback);
    }
    

    // 用ID更新消費狀態
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
    // updateUserByID(ID, Cname, PhoneNumber, Address, Age, Occupation, RegisterDate, Photo, ConsumptionStatus, AmountToBeCollected, ReceivableDate, ReceivableAmount)
    addOrderRecord = async (RecordData) => {
        try {
          const UserData = await this.getUserByID(RecordData.CID);
          const results = await this.connection.query('INSERT INTO orders SET ?', [RecordData]);
          const updateAmount = {
            "AmountToBeCollected": RecordData.UnitPrice*RecordData.Quantity + UserData.AmountToBeCollected
          }
          console.log(updateAmount);
          console.log(RecordData.CID);
          console.log(RecordData);
          await this.updateUserByID(RecordData.CID, UserData.Cname, UserData.PhoneNumber, UserData.Address, UserData.Age, UserData.Occupation, UserData.RegisterDate, UserData.Photo, UserData.ConsumptionStatus, RecordData.Total + UserData.AmountToBeCollected, UserData.ReceivableDate, UserData.ReceivableAmount);
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

    // 用產品編號找產品
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

    // 新增產品
    addProduct = async (ProductData) => {
        try {
            const query = 'INSERT INTO product SET ?';
            const results = await this.connection.query(query, [ProductData]);
            return results;
        } catch (error) {
            throw error;
        }
    }
    
    // 用供應商編號找供應商
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
    
    // 新增進貨
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
