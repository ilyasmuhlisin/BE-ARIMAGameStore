const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, verifyOrder } = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and payment flow
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order (checkout games)
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
 *               - products
 *               - payment_method
 *             properties:
 *               products:
 *                 type: array
 *                 description: List of product IDs to purchase
 *                 items:
 *                   type: string
 *                   example: 661acaa84692f1ae0be3a2b7
 *               payment_method:
 *                 type: string
 *                 enum: [OVO, BCA, DANA, ShopeePay, QRIS]
 *                 example: OVO
 *               proof:
 *                 type: string
 *                 description: Optional proof of payment URL
 *                 example: https://imgur.com/bukti-transfer.png
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Some products not found
 */
router.post("/", authMiddleware, createOrder);

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
 */
router.get("/me", authMiddleware, getMyOrders);

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
 */
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

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
 *       400:
 *         description: Order already completed
 *       404:
 *         description: Order not found
 */
router.patch("/:id/verify", authMiddleware, adminMiddleware, verifyOrder);

module.exports = router;
