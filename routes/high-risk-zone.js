const express = require( 'express' )
const {getHzoneByVillageId} = require("../controllers/high-risk-zone.controller");
const {getHzoneByDistrictId} = require("../controllers/high-risk-zone.controller");
const {
    get_h_zones,
    create_h_zone,
    update_h_zone,
    delete_h_zone,
    create_h_images,
    get_h_zoneById} = require( '../controllers/high-risk-zone.controller' )

const {upload} = require( '../functions/insertFile' );
const {CREATE_DIR} = require( '../middleware/createUploadDirectory' );
const {protect, authorize} = require( '../middleware/auth' )

const router = express.Router( {mergeParams: true} )
/**
 * @swagger
 * definitions:
 *   h_zone_image:
 *     required:
 *       - files
 *     properties:
 *       dms_images_id:
 *         type: string
 *       files:
 *         type: file
 */


/**
 * @swagger
 * definitions:
 *   h_zone:
 *     required:          
 *       - zone_name
 *       - registered_by_user_id
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
router.route( '/' ).get( get_h_zones )
/**
 * @swagger
 * /api/v1/h_zones/images/{id}:
 *   post:
 *    tags:
 *      - h_zone
 *    description: Create a new h_zone image
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *      - name: files
 *        in: formData
 *        type: file
 *        description: The file to upload
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/' ).post( create_h_zone )
/**
 * @swagger
 * /api/v1/h_zones:
 *   post:
 *    tags:
 *      - h_zone
 *    description: Create a new h_zone 
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
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

router.route( '/images/:id' ).post( [ CREATE_DIR( "hZoneImages" ), upload.array( 'files', 5 ), create_h_images ] )

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
 *          $ref: '#/definitions/h_zone_image'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route( '/:id' ).put( update_h_zone )
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

router.route( '/:id' ).delete( delete_h_zone )


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
 *          $ref: '#/definitions/h_zone_image'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/getHzoneByDistrictId/:district_id').get(getHzoneByDistrictId);
/**
 * @swagger
 * /api/v1/h_zones/getHzoneByDistrictId/{district_id}:
 *   get:
 *    tags:
 *      - h_zone
 *    description: get a high risk zone by district id
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "district_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/h_zone'
 *    responses:
 *      201:
 *        description: success
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/getHzoneByVillageId/:village_id').get(getHzoneByVillageId);

/**
 * @swagger
 * /api/v1/h_zones/getHzoneByVillageId/{village_id}:
 *   get:
 *    tags:
 *      - h_zone
 *    description: get a high risk zone by village id
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "village_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/h_zone'
 *    responses:
 *      201:
 *        description: success
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route( '/getHighRiskZoneById/:id' ).get( get_h_zoneById )

/**
 * @swagger
 * /api/v1/h_zones/getHighRiskZoneById/{h_zone_id}:
 *   get:
 *    tags:
 *      - h_zone
 *    description: get a high risk zone by id 
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


module.exports = router
