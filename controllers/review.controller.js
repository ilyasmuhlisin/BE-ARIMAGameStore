const Review = require('../models/review.model');
const GameLibrary = require('../models/gameLibrary.model');

const createReview = async (req, res, next) => {
  try {
    const { game_id, description } = req.body;
    const user_id = req.user.id;

    const hasGame = await GameLibrary.findOne({ user_id, game_id });
    if (!hasGame) return res.status(403).json({ message: 'You must own the game to review it' });

    const review = await Review.create({ user_id, game_id, description });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

const getReviewsByGame = async (req, res, next) => {
  try {
    const reviews = await Review.find({ game_id: req.params.gameId }).populate('user_id');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user_id').populate('game_id');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createReview, getReviewsByGame, getAllReviews, deleteReview };