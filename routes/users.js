const express = require( 'express' )
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    createUSerSignature,
    createLevelSignature,
    login, updatePassword} = require( '../controllers/users.controller' )
const {upload} = require( '../functions/insertFile' )
const {CREATE_DIR} = require( '../middleware/createUploadDirectory' )
const {protect, authorize} = require( '../middleware/auth' )
// const { route } = require('./UserTypes')
/**
* @swagger
* definitions:
*   users:
*     required:          
*       - first_name
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

/**
* @swagger
* components:
*   schemas:
*     login:
*       properties:
*         email:
*           type: string
*         password:
*           type: string
*/
/**
* @swagger
* components:
*   schemas:
*     UPDATE_PASSWORD:
*       properties:
*         current_password:
*           type: string
*         new_password:
*           type: string
*/

const router = express.Router( {mergeParams: true} )
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
router.route( '/' ).get( getUsers )
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
 *          $ref: '#/components/users'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */


router.route( '/getUserId/:id' ).get( getUserById )

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
 *          $ref: '#/components/users'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/' ).post( createUser )
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
 *          $ref: '#/components/schemas/users'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/:id' ).put( updateUser )

/**
 * @swagger
 * /api/v1/users/deleteUser/{user_id}:
 *   put:
 *    tags:
 *      - users
 *    description: delete a user
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
 *          $ref: '#/components/users'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route( '/deleteUser/:id' ).put( deleteUser )

router.route( '/addUserSignature/:user_id' ).put( [ CREATE_DIR( "userSignatures" ), upload.single( 'signature' ), createUSerSignature ] )

/**
 * @swagger
 * /api/v1/users/addUserSignature/{user_id}:
 *   put:
 *    tags:
 *      - users
 *    description: Create a new user signature
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: user_id
 *        in: path
 *        required: true
 *      - name: files
 *        in: formData
 *        type: file
 *        description: The signature to upload
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */


router.route( '/addLevelsStamp/:user_id' ).put( [ CREATE_DIR( "levelSignatures" ), upload.single( 'signature' ), createLevelSignature ] )

/**
 * @swagger
 * /api/v1/users/addLevelsStamp/{user_id}:
 *   put:
 *    tags:
 *      - users
 *    description: Create a new level stamp
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: user_id
 *        in: path
 *        required: true
 *      - name: files
 *        in: formData
 *        type: file
 *        description: The stamp to upload
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/login' ).post( login );
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *    tags:
 *      - login
 *    description: Login into the account
 *    consumes:
 *      - "application/json"
 *    produces:
 *      - "application/json"
 *    requestBody:
 *      description: Log in credentials
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/login'
 *    responses:
 *      201:
 *        description: created
 *      400:
 *        description: bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/changePassword/:id' ).put( updatePassword );

/**
 * @swagger
 * /api/v1/users/changePassword/{id}:
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
 *      - name: id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a user
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/UPDATE_PASSWORD'
 *    responses:
 *      201:
 *        description: password updated successfully
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
module.exports = router
