// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/user.model');
const Developer = require('./models/developer.model');
const Category = require('./models/category.model');
const Product = require('./models/product.model');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Developer.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Create users
    const user = await User.create({
      username: 'testuser',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
    });

    const admin = await User.create({
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });

    // Create developers
    const developer = await Developer.create({
      developer_name: 'GameDev Studio',
      description: 'A leading game development studio',
    });

    // Create categories
    const category = await Category.create({
      category_name: 'Action',
      description: 'Action-packed games',
    });

    // Create products
    await Product.create({
      description: 'An epic action adventure game',
      categories_id: category._id,
      developer_id: developer._id,
      price: 59.99,
    });

    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();