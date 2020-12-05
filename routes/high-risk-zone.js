const express = require('express')
const { 
    get_h_zones, 
    create_h_zone, 
    update_h_zone,
    delete_h_zone, 
    get_h_zone } = require('../controllers/high-risk-zone.controller')
    // const { route } = require('./_h_zoneTypes')

const router = express.Router({ mergeParams: true })
/**
 * @swagger
 * definitions:
 *   h_zone:
 *     required:          
 *       - zone_name
 *       - registered_by_user_id
 *       - picture_store
 *       - village_id
 *     properties:
 *       h_zone_id:
 *         type: string
 *       zone_name:
 *         type: string
 *       registered_by_user_id:
 *         type: number
 *       village_id:
 *          type: string
 *       done_on: 
 *          type: string
 *       picture_store:
 *          type: string
 *       status:
 *          type: string 
 *          enum: ['ACTIVE', 'PENDING', 'DECLINED', 'CLOSED']
 */ 


 /**
 * @swagger
 * /api/v1/h_zones:
 *   get:
 *     tags:
 *       - h_zone
 *     description: Get all h_zone
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */
router.route('/').get(get_h_zones)
/**
 * @swagger
 * /api/v1/h_zones:
 *   post:
 *    tags:
 *      - h_zone
 *    description: Create a h_zone
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a h_zone
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/h_zone'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/').post(create_h_zone)
/**
 * @swagger
 * /api/v1/h_zones/{h_zone_id}:
 *   put:
 *    tags:
 *      - h_zone
 *    description: Update a h_zone
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: h_zone_id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a h_zone
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/h_zone'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/:id').put(update_h_zone)
/**
 * @swagger
 * /api/v1/h_zones/{h_zone_id}:
 *   delete:
 *    tags:
 *      - h_zone
 *    description: Update a h_zone
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "h_zone_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/h_zone'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/:id').delete(delete_h_zone)

module.exports = router