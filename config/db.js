const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const path = require("path");

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "../.env.production")
      : path.resolve(__dirname, "../.env.development"),
});

console.log(`++Sequeliza++ 当前环境：${process.env.NODE_ENV}`);

const isProd = process.env.NODE_ENV === "production";


const sequelize = new Sequelize(
  process.env.DB_NAME,     // 数据库名
  process.env.DB_USER,     // 用户名
  process.env.DB_PASS,     // 密码
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,

    // 若为生产环境则增加连接池
    pool: isProd
      ? {
          max: 10,
          min: 2,
          acquire: 30000,
          idle: 10000,
        }
      : undefined,
  }
);


module.exports = sequelize;
