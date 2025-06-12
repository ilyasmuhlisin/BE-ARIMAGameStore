const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, createOrder);
router.get('/me', authMiddleware, getMyOrders);
router.get('/', authMiddleware, adminMiddleware, getAllOrders);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and history
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_id
 *             properties:
 *               game_id:
 *                 type: string
 *                 example: 60f6f9e7c2a4e35f4cd5b5f1
 *     responses:
 *       201:
 *         description: Order created and added to game library
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Game already in library
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Get logged-in user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 662b7ccf34cdaaf8a0f8a6f9
 *         game_id:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 661acaa84692f1ae0be3a2b7
 *             title:
 *               type: string
 *               example: Elden Ring
 *         user_id:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 661aca6b4692f1ae0be3a2a4
 *             username:
 *               type: string
 *               example: johndoe
 *         price:
 *           type: number
 *           example: 59.99
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-06-10T12:34:56.789Z
 */

module.exports = router;