const express = require('express')
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    createUSerSignature,
    createLevelSignature } = require('../controllers/users.controller')
const { upload } = require('../functions/insertFile')
const {CREATE_DIR} = require('../middleware/createUploadDirectory')
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
*       sector_id:
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


router.route('/getUserId/:id').get(getUserById)

/**
 * @swagger
 * /api/v1/users/getUserId/{user_id}:
 *   get:
 *    tags:
 *      - users
 *    description: get user by id 
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

router.route('/addUserSignature/:user_id').put([CREATE_DIR("userSignatures"), upload.single('signature'), createUSerSignature])

router.route('/addLevelsStamp/:user_id').put([CREATE_DIR("levelSignatures"), upload.single('signature'), createLevelSignature])
module.exports = router