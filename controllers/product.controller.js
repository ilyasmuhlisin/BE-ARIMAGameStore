const Product = require('../models/product.model');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('categories_id').populate('developer_id');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categories_id')
      .populate('developer_id');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name,description, categories_id, developer_id, price, pictures } = req.body;
    if (pictures && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(pictures)) {
      return res.status(400).json({ message: 'Invalid picture URL format' });
    }
    const product = await Product.create({name,pictures, description, categories_id, developer_id, price });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };