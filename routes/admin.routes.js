const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Admin dashboard" });
});

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only routes
 */

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Access the admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard access granted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin dashboard
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Forbidden (user is not an admin)
 */

module.exports = router;
