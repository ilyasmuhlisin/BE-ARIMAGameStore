const express = require('express');
const router = express.Router();
const {
  getAllDevelopers,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require('../controllers/developer.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', getAllDevelopers);
router.post('/', authMiddleware, adminMiddleware, createDeveloper);
router.put('/:id', authMiddleware, adminMiddleware, updateDeveloper);
router.delete('/:id', authMiddleware, adminMiddleware, deleteDeveloper);

module.exports = router;