const express = require("express");
const router = express.Router();
const {
  getAllDevelopers,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require("../controllers/developer.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/", getAllDevelopers);
router.post("/", authMiddleware, adminMiddleware, createDeveloper);
router.put("/:id", authMiddleware, adminMiddleware, updateDeveloper);
router.delete("/:id", authMiddleware, adminMiddleware, deleteDeveloper);

/**
 * @swagger
 * tags:
 *   name: Developers
 *   description: Developer management endpoints
 */

/**
 * @swagger
 * /api/developers:
 *   get:
 *     summary: Get all developers
 *     tags: [Developers]
 *     responses:
 *       200:
 *         description: List of all developers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Developer'
 */

/**
 * @swagger
 * /api/developers:
 *   post:
 *     summary: Create a new developer (Admin only)
 *     tags: [Developers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - developer_name
 *             properties:
 *               developer_name:
 *                 type: string
 *                 example: CD Projekt Red
 *               description:
 *                 type: string
 *                 example: Known for The Witcher and Cyberpunk series
 *     responses:
 *       201:
 *         description: Developer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Developer'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/developers/{id}:
 *   put:
 *     summary: Update a developer by ID (Admin only)
 *     tags: [Developers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the developer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               developer_name:
 *                 type: string
 *                 example: Ubisoft
 *               description:
 *                 type: string
 *                 example: Creator of Assassin's Creed series
 *     responses:
 *       200:
 *         description: Developer updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Developer'
 *       404:
 *         description: Developer not found
 */

/**
 * @swagger
 * /api/developers/{id}:
 *   delete:
 *     summary: Delete a developer by ID (Admin only)
 *     tags: [Developers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the developer to delete
 *     responses:
 *       200:
 *         description: Developer deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Developer deleted
 *       404:
 *         description: Developer not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Developer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60f1234567890abc12345678
 *         developer_name:
 *           type: string
 *           example: Naughty Dog
 *         description:
 *           type: string
 *           example: Developers of Uncharted and The Last of Us
 */

module.exports = router;
