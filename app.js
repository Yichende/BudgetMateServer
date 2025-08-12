const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user');
const billRoutes = require('./routes/bill');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/bill', billRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (err) {
    console.error('数据库连接失败：', err);
  }

  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
