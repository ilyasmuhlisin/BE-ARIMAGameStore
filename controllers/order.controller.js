const Order = require('../models/order.model');
const GameLibrary = require('../models/gameLibrary.model');
const Product = require('../models/product.model');

const createOrder = async (req, res, next) => {
  try {
    const { game_id } = req.body;
    const user_id = req.user.id;

    const product = await Product.findById(game_id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existingLibrary = await GameLibrary.findOne({ user_id, game_id });
    if (existingLibrary) return res.status(409).json({ message: 'Game already in library' });

    const order = await Order.create({ game_id, user_id, price: product.price });
    await GameLibrary.create({ user_id, game_id });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.user.id }).populate('game_id');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user_id').populate('game_id');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders };