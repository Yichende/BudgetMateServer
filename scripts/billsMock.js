const dayjs = require("dayjs");
const { Transaction } = require("../models");

async function createBillsMock(userId = 1) {
  const categories = ["购物", "餐饮", "娱乐", "交通", "生活缴费", "转账", "其他"];
  const types = ["income", "expense"];

  const today = dayjs();
  const txs = [];

  // 生成最近 6 个月的账单
  for (let m = 0; m < 6; m++) {
    const base = today.subtract(m, "month");
    for (let d = 1; d <= base.daysInMonth(); d++) {
      // 每天随机生成 0~3 笔账单
      const count = Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * 2)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const amount = type === "income"
          ? Math.floor(Math.random() * 500 + 100)
          : Math.floor(Math.random() * 200 + 20);

        const randomHour = Math.floor(Math.random() * 24);
        const randomMinute = Math.floor(Math.random() * 60);
        const randomSecond = Math.floor(Math.random() * 60);
        const date = base
          .date(d)
          .hour(randomHour)
          .minute(randomMinute)
          .second(randomSecond)
          .toDate();

        txs.push({
          amount,
          type,
          category,
          date: date,
          note: "mock数据",
          user_id: userId,
          synced: true,
        });
      }
    }
  }
  await Transaction.sync({ force: true });
  await Transaction.bulkCreate(txs);
  console.log(`已插入 ${txs.length} 条 mock 数据`);
  // console.log(txs);
}

createBillsMock().then(() => process.exit());
