const { Transaction } = require("../models");
const dayjs = require("dayjs");

async function printTransactions() {
  try {

    // 查询前 x 条账单
    const txs = await Transaction.findAll({
      limit: 10,
      order: [["date", "DESC"]],
    });

    console.log("打印账单日期数据：");
    txs.forEach((t) => {
      console.log(
        `id=${t.id}, raw=${t.date}, format=${dayjs(t.date).format(
          "YYYY-MM-DD HH:mm:ss"
        )}`
      );
    });
  } catch (err) {
    console.error("❌ 查询失败:", err);
  }
}

printTransactions().then(() => process.exit());
