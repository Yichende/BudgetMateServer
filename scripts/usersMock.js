const { faker } = require('@faker-js/faker');
const { User } = require('../models');
const sequelize = require('../config/db');

async function createUsersMockData() {
  try {
    await sequelize.sync({ force: true }); // 清空数据库，重新创建表结构

    for (let i = 0; i < 5; i++) {
      const user = await User.create({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 123456,
      });
    }

    console.log('Mock data created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error creating mock data:', err);
    process.exit(1);
  }
}

createUsersMockData();