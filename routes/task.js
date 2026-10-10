import express from "express";
const router= express.Router();
import {createTask, getAllTasks,getTask, updateTask, deleteTask} from "../controllers/task.js";
import {protect} from "../controllers/auth.js";

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task management API
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Express.js
 *               description:
 *                 type: string
 *                 example: Learn how to build REST APIs
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *                 example: pending
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-01T10:00:00.000Z"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid task data
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all tasks belonging to the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn MongoDB
 *               description:
 *                 type: string
 *                 example: Practice MongoDB queries
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *                 example: in progress
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-11-10T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid task data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */

//router
router.post("/",protect, createTask);
router.get("/",protect, getAllTasks)
router.get("/:id",protect, getTask)
router.put("/:id",protect,updateTask)
router.delete("/:id",protect,deleteTask)

export default router;