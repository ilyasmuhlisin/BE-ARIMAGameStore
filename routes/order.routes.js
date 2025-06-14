const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, verifyOrder } = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/", authMiddleware, createOrder);
router.get("/me", authMiddleware, getMyOrders);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/:id/verify", authMiddleware, adminMiddleware, verifyOrder);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and payment flow
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
 *           $ref: '#/components/schemas/Product'
 *         user_id:
 *           $ref: '#/components/schemas/User'
 *         price:
 *           type: number
 *           example: 59.99
 *         payment_method:
 *           type: string
 *           example: OVO
 *         proof:
 *           type: string
 *           example: https://imgur.com/buktibayar.jpg
 *         status:
 *           type: string
 *           enum: [pending, completed]
 *           example: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (checkout game)
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
 *               - payment_method
 *             properties:
 *               game_id:
 *                 type: string
 *                 example: 661acaa84692f1ae0be3a2b7
 *               payment_method:
 *                 type: string
 *                 enum: [OVO, BCA, DANA, ShopeePay, QRIS]
 *                 example: OVO
 *               proof:
 *                 type: string
 *                 example: https://imgur.com/bukti.png
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       409:
 *         description: Game already in library
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/orders/me:
 *   get:
 *     summary: Get user's order history
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
 *     summary: Get all orders (admin only)
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
 * /api/orders/{id}/verify:
 *   patch:
 *     summary: Mark an order as completed (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to verify
 *     responses:
 *       200:
 *         description: Order marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order marked as completed
 *       400:
 *         description: Order already completed
 *       404:
 *         description: Order not found
 */
