module.exports = {
  apps: [
    {
      name: "budgetmate",       // PM2 应用名
      script: "./app.js",       // 启动脚本
      cwd: "./",                // 当前工作目录

      // 默认环境（开发）
      env: {
        NODE_ENV: "development",
      },

      // 生产环境
      env_production: {
        NODE_ENV: "production",
      }
    }
  ],
};
