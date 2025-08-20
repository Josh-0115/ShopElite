const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  try {
    // Add a console.log to see the data being received
    console.log('User ID:', req.user.userId);
    console.log('Request Body:', req.body);
    
    const order = new Order({
      user: req.user.userId,
      items,
      totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    // The console will show the specific Mongoose validation error here
    console.error('Error creating order:', err);
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