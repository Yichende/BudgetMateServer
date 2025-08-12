const express = require('express');
const { Transaction } = require('../models');
const auth = require('../middlewares/auth');

const router = express.Router();

// 所有账单
router.get('/', auth, async (req, res) => {
  try {
    const bills = await Transaction.findAll({
      where: { user_id: req.user.id },
      order: [['date', 'DESC']]
    });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建账单
router.post('/', auth, async (req, res) => {
  const { amount, type, category, date, note } = req.body;

  try {
    const bill = await Transaction.create({
      amount,
      type,
      category,
      date,
      note,
      user_id: req.user.id
    });
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除账单
router.delete('/:id', auth, async (req, res) => {
  try {
    const bill = await Transaction.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!bill) return res.status(404).json({ message: '账单不存在' });

    await bill.destroy();
    res.json({ message: '删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 修改账单
router.put('/:id', auth, async (req, res) => {
  try {
    const bill = await Transaction.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!bill) return res.status(404).json({ message: '账单不存在' });

    await bill.update(req.body);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
