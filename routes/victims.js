const express = require('express')
const { 
    getVictims, 
    createVictim, 
    updateVictim,
    deleteVictim, 
    getVictimById,
    getVictim } = require('../controllers/victims.controller')
    // const { route } = require('./VictimTypes')
const { protect,authorize } = require('../middleware/auth')

  /**
 * @swagger
 * definitions:
 *   victims:
 *     required:
 *       - first_name
 *       - last_name
 *       - gender
 *       - age
 *       - marital_status
 *       - last_name
 *       - family_members
 *       - primary_phone_number
 *       - national_id
 *       - is_employed
 *       - ikiciro_ubudehe
 *       - isibo
 *       - village_id
 *     properties:
 *       victim_pin:
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
 *       marital_status:
 *         type: string
 *         enum: [SINGLE,MARRIED,DIVORCED]
 *         default: SINGLE
 *       family_members:
 *         type: number
 *       primary_phone_number:
 *          type: string
 *       secondary_phone_number:
 *          type: string
 *       national_id:
 *          type: number
 *       is_employed:
 *          type: boolean
 *       ikiciro_ubudehe:
 *          type: string
 *       isibo:
 *          type: string
 *       village_id:
 *          type: string
 *       done_on:
 *          type: string
 */

const router = express.Router({ mergeParams: true })
/**
 * @swagger
 * /api/v1/victims:
 *   get:
 *     tags:
 *       - victims
 *     description: Get all victims
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/').get(getVictims)
/**
 * @swagger
 * /api/v1/victims:
 *   post:
 *    tags:
 *      - victims
 *    description: Create a victim
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a victim
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/victims'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/').post(createVictim)
/**
 * @swagger
 * /api/v1/victims/{victim_id}:
 *   put:
 *    tags:
 *      - victims
 *    description: Update a victim
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: victim_id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a victim
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/victims'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/:id').put(updateVictim)
/**
 * @swagger
 * /api/v1/victims/{victim_id}:
 *   delete:
 *    tags:
 *      - victims
 *    description: Update a victim
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "victim_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/victims'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/:id').delete(deleteVictim)


router.route('/getVictimById:id').get(getVictimById)
/**
 * @swagger
 * /api/v1/reports/getVictimById/{victim_id}:
 *   get:
 *    tags:
 *      - victims
 *    description: get victim by id 
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "victim_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/victims'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */


module.exports = router
