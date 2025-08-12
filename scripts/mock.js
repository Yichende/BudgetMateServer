const { faker } = require('@faker-js/faker');
const { User, Transaction } = require('../models');
const sequelize = require('../config/db');

async function createMockData() {
  try {
    await sequelize.sync({ force: true }); // 清空数据库，重新创建表结构

    for (let i = 0; i < 5; i++) {
      const user = await User.create({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 123456,
      });

      for (let j = 0; j < 10; j++) {
        await Transaction.create({
          user_id: user.id,
          type: faker.helpers.arrayElement(['income', 'expense']),
          amount: parseFloat(faker.number.float({ min: 10, max: 1000 }).toFixed(2)),
          category: faker.commerce.department(),
          description: faker.lorem.sentence(),
          date: faker.date.recent(30),
        });
      }
    }

    console.log('Mock data created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error creating mock data:', err);
    process.exit(1);
  }
}

createMockData();
