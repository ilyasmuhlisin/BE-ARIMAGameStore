const Developer = require('../models/developer.model');

const getAllDevelopers = async (req, res, next) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    next(err);
  }
};

const createDeveloper = async (req, res, next) => {
  try {
    const { developer_name, description } = req.body;
    const developer = await Developer.create({ developer_name, description });
    res.status(201).json(developer);
  } catch (err) {
    next(err);
  }
};

const updateDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!developer) return res.status(404).json({ message: 'Developer not found' });
    res.json(developer);
  } catch (err) {
    next(err);
  }
};

const deleteDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findByIdAndDelete(req.params.id);
    if (!developer) return res.status(404).json({ message: 'Developer not found' });
    res.json({ message: 'Developer deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllDevelopers, createDeveloper, updateDeveloper, deleteDeveloper };