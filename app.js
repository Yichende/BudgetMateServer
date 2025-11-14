const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user');
const billRoutes = require('./routes/bill');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

function formatDate(date) {
  const pad = (n) => n.toString().padStart(2, '0'); // 补零
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从0开始
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// 日志中间件：打印每个请求的信息
app.use((req, res, next) => {
  const start = Date.now();

  // 监听响应完成事件
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const status = res.statusCode;
    const time = formatDate(new Date());

    // 只在有请求体时打印
    let bodyInfo = '';
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      bodyInfo = ` | Body: ${JSON.stringify(req.body)}`;
    }

    console.log(
      `[${time}] ${method} ${originalUrl} ${status} - ${duration}ms${bodyInfo}`
    );
  });

  next();
});

app.use('/api/user', userRoutes);
app.use('/api/bill', billRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.DB_PORT || 3000;
// app.listen(PORT, async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('数据库连接成功');
//   } catch (err) {
//     console.error('数据库连接失败：', err);
//   }

//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });
// app.listen(3000, "0.0.0.0", () => console.log("Server running on 0.0.0.0:3000"));
app.listen(PORT, "0.0.0.0", async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');

    await sequelize.sync({ alter: true });
    console.log("数据库结构同步完成");
  } catch (err) {
    console.error('数据库连接失败：', err);
  }

  console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
});