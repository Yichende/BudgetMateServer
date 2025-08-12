require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME,     // 数据库名
  process.env.DB_USER,     // 用户名
  process.env.DB_PASS,     // 密码
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASS:', process.env.DB_PASS ? '***' : '(empty)');
// console.log('DB_NAME:', process.env.DB_NAME);


module.exports = sequelize;
