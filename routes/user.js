import express from 'express';
const router= express.Router();
import { createUser,loginUser,getUser } from '../controllers/user.js';
import { protect } from '../controllers/auth.js';
import { validate } from '../Middleware/Validation.js';
import { userSchema } from '../Schemas/userSchemas.js';

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management API
 */

/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: wali
 *               email:
 *                 type: string
 *                 example: wali@gmail.com
 *               password:
 *                 type: string
 *                 example: Ma1234@ge
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/loginUser:
 *   post:
 *     summary: Login using email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *              
 *               password:
 *                 type: string
 *                 
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authorized
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Mustafe you are authorized person
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post('/create',validate(userSchema), createUser)
router.get('/get', getUser)
router.post('/loginUser', loginUser)
router.get('/profile', protect,(req, res)=>{
    res.send(`${req.user.name} you are authorized person`)
})
//command js export router 
// module.exports = router
// module export router
export default router;