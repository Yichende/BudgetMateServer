const User = require('./User');
const Transaction = require('./Transaction');
const sequelize = require('../config/db');


// 关联：一个用户对应多个账单
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Transaction };
