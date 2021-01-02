const express = require('express')
const { 
    getLevels, 
    createLevel, 
    updateLevel,
    deleteLevel, 
    getLevelsById
 } = require('../controllers/levels.controller')
    // const { route } = require('./LevelTypes')
const router = express.Router({ mergeParams: true })


/**
 * @swagger
 * definitions:
 *   levels:
 *     required:          
 *       - level_title
 *       - level_system_users_counter
 *       - level_short_bio
 *       - level_status
 *     properties:
 *       level_id:
 *         type: string
 *       level_title:
 *         type: string
 *       level_system_users_counter:
 *         type: number
 *       level_short_bio:
 *          type: string
 *       level_status:
 *          type: string
 */ 
 /**
 * @swagger
 * /api/v1/levels:
 *   get:
 *     tags:
 *       - levels
 *     description: Get all levels
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/').get(getLevels)
/**
 * @swagger
 * /api/v1/levels:
 *   post:
 *    tags:
 *      - levels
 *    description: Create a level
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a level
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/levels'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/').post(createLevel)
/**
 * @swagger
 * /api/v1/levels/{level_id}:
 *   put:
 *    tags:
 *      - levels
 *    description: Update a level
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: level_id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a level
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/levels'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/:id').put(updateLevel)

/**
 * @swagger
 * /api/v1/levels/{level_id}:
 *   delete:
 *    tags:
 *      - levels
 *    description: Update a level
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "level_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/levels'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/').delete(deleteLevel)


router.route('/getLevelById/:id').get(getLevelsById)


/**
 * @swagger
 * /api/v1/levels/getLevelById/{level_id}:
 *   get:
 *    tags:
 *      - levels
 *    description: get level by id 
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "level_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/levels'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */


module.exports = router