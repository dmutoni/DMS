const express = require( 'express' )
const {getChats, createMessage} = require( '../controllers/chats.controller' )
// const { route } = require('./DonationTypes')

const router = express.Router( {mergeParams: true} )

const {protect, authorize} = require( '../middleware/auth' )


/**
 * @swagger
 * definitions:
 *   chats:
 *     required:          
 *       - sender_id
 *       - receiver_id
 *       - content
 *     properties:
 *       message_id:
 *         type: string
 *       sender_id:
 *         type: string
 *       receiver_id:
 *         type: number
 *       content:
 *          type: string
 *       seen:
 *          type: boolean
 *       date:
 *          type: timestamp
 */


/**
* @swagger
* /api/v1/chats:
*   get:
*     tags:
*       - chats
*     description: Get all chats
*     responses:
*       200:
*         description: OK
*       404:
*         description: Not found
*       500:
*         description: Internal Server error
*/

router.route( '/' ).get( getChats )
/**
 * @swagger
 * /api/v1/chats:
 *   post:
 *    tags:
 *      - chats
 *    description: Create a chats
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a chats
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/chats'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route( '/' ).post( createMessage )
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
// router.route( '/:id' ).put( updateDonation )
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
// router.route( '/:id' ).delete( deleteDonation )

// router.route( '/getDonationsById/:id' ).get( getDonationById )

/**
 * @swagger
 * /api/v1/users/getDonationsById/{donation_id}:
 *   get:
 *    tags:
 *      - donations
 *    description: get donation by id 
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


module.exports = router
