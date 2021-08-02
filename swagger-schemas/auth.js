/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         -   email
 *         -   password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of User
 *         password:
 *           type: string
 *           description: Password of User
 *       example:
 *         email: example@mail.com
 *         password: P@ssw0rd.
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string
 *     Token:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Api
 */

/**
 * @swagger
 * paths:
 *   /accounts/auth/register:
 *     post:
 *       summary: Register a User
 *       tags: [Auth]
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Token'
 *         '422':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *   /accounts/auth/login:
 *     post:
 *       summary: Login  a User
 *       tags: [Auth]
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: A list of users.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Token'
 *         '422':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *   /accounts/auth/refresh-token:
 *     post:
 *       summary: Refresh Token for User
 *       tags: [Auth]
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *       responses:
 *         '200':
 *           description: A list of users.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Token'
 *         '422':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *   /accounts/auth/logout:
 *     delete:
 *       summary: Refresh Token for User
 *       tags: [Auth]
 *       parameters:
 *         - in: header
 *           name: authorization
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         '200':
 *           description: A list of users.
 *         '422':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
