const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  try {
    const order = new Order({
      user: req.user.userId,
      items,
      totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};