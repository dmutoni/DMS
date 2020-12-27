const express = require('express')
const { 
    getUsers, 
    createUser, 
    updateUser,
    deleteUser, 
    getUser } = require('../controllers/users.controller')
    // const { route } = require('./UserTypes')
 /**
 * @swagger
 * definitions:
 *   users:
 *     required:          
 *       - first_name
 *       - last_name
 *       - gender
 *       - age
 *       - job_title
 *       - last_name
 *       - password
 *       - phone_number
 *       - national_id
 *       - user_type
 *       - user_status
 *     properties:
 *       user_id:
 *         type: string
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       gender:
 *         type: string
 *         enum: [FEMALE,MALE]
 *       age:
 *         type: number
 *       email:
 *         type: string
 *       phone_number:
 *          type: string
 *       national_id:
 *          type: number
 *       password:
 *          type: string
 *       job_title:
 *          type: string
 *       address:
 *          type: string
 *       user_type:
 *          type: string
 *          enum: ['DISTRICT', 'SECTOR', 'NATIONAL']
 *       user_status:
 *          type: string 
 *          enum: ['ACTIVE', 'INACTIVE']
 */ 
const router = express.Router({ mergeParams: true })
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
router.route('/').get(getUsers)
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *    tags:
 *      - users
 *    description: Create a user
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a user
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/users'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/').post(createUser)
/**
 * @swagger
 * /api/v1/users/{user_id}:
 *   put:
 *    tags:
 *      - users
 *    description: Update a user
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: user_id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a user
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/users'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/:id').put(updateUser)

/**
 * @swagger
 * /api/v1/users/deleteUser/{user_id}:
 *   put:
 *    tags:
 *      - users
 *    description: Update a user
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "user_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/users'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/deleteUser/:id').put(deleteUser)

module.exports = router