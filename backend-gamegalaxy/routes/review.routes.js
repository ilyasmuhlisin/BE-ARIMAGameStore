const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByGame,
  getAllReviews,
  deleteReview,
} = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, createReview);
router.get('/game/:gameId', getReviewsByGame);
router.get('/', authMiddleware, adminMiddleware, getAllReviews);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReview);

module.exports = router;