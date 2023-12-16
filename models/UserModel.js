const mysql = require('mysql');

class UserModel {
    constructor() {
        this.connection = mysql.createConnection({
<<<<<<< HEAD
            host: '127.0.0.1',
            port: '3306',
=======
            host: '0.tcp.jp.ngrok.io',
            port: '11848',
>>>>>>> b871eb3e59740af310d663adde0ce9d7a67fab90
            user: 'root',
            password: 'chichi77',
            database: 'fooddelivery'
        });
    }

    getAllUsers(callback) {
        this.connection.query('SELECT * FROM client', callback);
    }

    getUserByID(ID, callback) {
        this.connection.query('SELECT * FROM client WHERE ID = ?', [ID], callback);
    }         

    createUser(newUser, callback) {
        this.connection.query('INSERT INTO client SET ?', newUser, callback);
    }

    updateUserByID(ID, updatedData, callback) {
        this.connection.query('UPDATE client SET ? WHERE ID = ?', [updatedData, ID], callback);
    }
    
    updateConsumptionStatusByID(ID, newStatus, callback) {
        this.connection.query('UPDATE client SET ConsumptionStatus = ? WHERE ID = ?', [newStatus, ID], callback);
    }

    // 其他操作...
    // 新增訂單資料async, await
    addOrderRecord = async (RecordData) => {
        try {
          const results = await this.connection.query('INSERT INTO orders SET ?', [RecordData]);
          return results;
        } catch (error) {
          throw error;
        }
    };
<<<<<<< HEAD

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
=======
>>>>>>> b871eb3e59740af310d663adde0ce9d7a67fab90
    

    closeConnection() {
        this.connection.end();
    }
}

module.exports = UserModel;
