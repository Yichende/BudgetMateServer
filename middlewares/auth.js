const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "缺少认证信息" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "无效的 token 格式" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.warn("token 校验失败:", err.name, err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token 已过期" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "无效的 token" });
    }
    return res.status(401).json({ message: "token 校验失败" });
  }
};
