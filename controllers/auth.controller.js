// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../utils/token');

const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    const token = generateToken(user);
    user.session_token = token;
    await user.save();

    res.status(201).json({ user: { id: user._id, username, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    user.session_token = token;
    await user.save();

    res.json({ user: { id: user._id, username, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };