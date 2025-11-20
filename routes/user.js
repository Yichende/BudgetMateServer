const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { User } = require("../models");

const router = express.Router();

// 注册接口
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "邮箱已注册" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashed });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .json({ token, user: { id: newUser.id, username: newUser.username, email: newUser.email, createdAt: newUser.created_at } });
  } catch (err) {
    res.status(500).json({ message: "注册失败", error: err.message });
  }
});

// 登录接口
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "用户不存在" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "密码错误" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "登录失败", error: err.message });
  }
});

// 刷新用户数据
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "username", "email", "created_at"],
    });

    if (!user) {
      return res.status(404).json({ message: "user inexist" });
    }

    res.json({ user });
  } catch (err) {
    console.error("获取用户信息失败", err);
    res.status(500).json({ meassage: "server error" });
  }
});

router.post("/refreshToken", async (req, res) => {
  try {
    const { id, email } = req.user;

    const newToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: newToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error'});
  }
});

module.exports = router;
