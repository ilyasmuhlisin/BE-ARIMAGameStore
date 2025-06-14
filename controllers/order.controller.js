const Order = require("../models/order.model");
const GameLibrary = require("../models/gameLibrary.model");
const Product = require("../models/product.model");

const createOrder = async (req, res, next) => {
  try {
    const { products, payment_method, proof } = req.body;
    const user_id = req.user.id;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required" });
    }

    const foundProducts = await Product.find({ _id: { $in: products } });

    if (foundProducts.length !== products.length) {
      return res.status(404).json({ message: "Some products not found" });
    }

    const total_price = foundProducts.reduce((acc, item) => acc + item.price, 0);

    const order = await Order.create({
      products,
      user_id,
      total_price,
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
    const orders = await Order.find({ user_id: req.user.id }).populate("products", "name").sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user_id", "username").populate("products", "name").sort({ createdAt: -1 });

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

    for (const productId of order.products) {
      const exists = await GameLibrary.findOne({
        user_id: order.user_id,
        game_id: productId,
      });

      if (!exists) {
        await GameLibrary.create({
          user_id: order.user_id,
          game_id: productId,
        });
      }
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
