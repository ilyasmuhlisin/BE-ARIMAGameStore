const Order = require("../models/order.model");
const GameLibrary = require("../models/gameLibrary.model");
const Product = require("../models/product.model");

const createOrder = async (req, res, next) => {
  try {
    const { game_id, payment_method, proof } = req.body;
    const user_id = req.user.id;

    const product = await Product.findById(game_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyOwned = await GameLibrary.findOne({ user_id, game_id });
    if (alreadyOwned) return res.status(409).json({ message: "Game already in library" });

    const order = await Order.create({
      game_id,
      user_id,
      price: product.price,
      payment_method,
      proof,
      status: "pending",
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.user.id }).populate("game_id").sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user_id", "username").populate("game_id", "name").sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const verifyOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "completed") {
      return res.status(400).json({ message: "Order already completed" });
    }

    order.status = "completed";
    await order.save();

    const alreadyInLibrary = await GameLibrary.findOne({ user_id: order.user_id, game_id: order.game_id });
    if (!alreadyInLibrary) {
      await GameLibrary.create({ user_id: order.user_id, game_id: order.game_id });
    }

    res.json({ message: "Order marked as completed" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  verifyOrder,
};
