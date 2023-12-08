const mysql = require('mysql');

class UserModel {
    constructor() {
        this.connection = mysql.createConnection({
            host: '0.tcp.jp.ngrok.io',
            port: '11848',
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
    

    closeConnection() {
        this.connection.end();
    }
}

module.exports = UserModel;
