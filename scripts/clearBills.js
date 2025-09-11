const { Transaction } = require("../models");

async function clearTransactions() {
  try {
    // 删除所有记录
    await Transaction.destroy({
      where: {}, // 不加条件，全部删除
      truncate: true, // 重置自增ID
    });

    console.log("✅ transactions 表已清空");
    process.exit(0);
  } catch (err) {
    console.error("❌ 清空 transactions 表失败:", err);
    process.exit(1);
  }
}

clearTransactions();
