const mysql = require('mysql');

class UserModel {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
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

    closeConnection() {
        this.connection.end();
    }
}

module.exports = UserModel;
