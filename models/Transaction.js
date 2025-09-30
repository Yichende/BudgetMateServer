const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define(
  "Transaction",
  {
    amount: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.ENUM("income", "expense"), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    note: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    synced: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Transaction;
