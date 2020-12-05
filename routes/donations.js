const express = require('express')
const { 
    getDonations, 
    createDonation, 
    updateDonation,
    deleteDonation, 
    getDonation } = require('../controllers/donations.contoller')
    // const { route } = require('./DonationTypes')

const router = express.Router({ mergeParams: true })

/**
 * @swagger
 * definitions:
 *   donations:
 *     required:          
 *       - donation_id
 *       - donation_amount_given
 *       - solved_by_level_id
 *     properties:
 *       donation_id:
 *         type: string
 *       report_id:
 *         type: string
 *       donation_amount_given:
 *         type: number
 *       high_zone_area_if_available_id:
 *          type: string
 *       solved_by_level_id:
 *          type: string
 *       done_on:
 *          type: string
 */ 


 /**
 * @swagger
 * /api/v1/donations:
 *   get:
 *     tags:
 *       - donations
 *     description: Get all donations
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/').get(getDonations)
/**
 * @swagger
 * /api/v1/donations:
 *   post:
 *    tags:
 *      - donations
 *    description: Create a donation
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a donation
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/donations'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/').post(createDonation)
/**
 * @swagger
 * /api/v1/donations/{donation_id}:
 *   put:
 *    tags:
 *      - donations
 *    description: Update a donation
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: donation_id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a donation
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/donations'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/:id').put(updateDonation)
/**
 * @swagger
 * /api/v1/donations/{donation_id}:
 *   delete:
 *    tags:
 *      - donations
 *    description: Update a donation
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "donation_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/donations'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/:id').delete(deleteDonation)

module.exports = router