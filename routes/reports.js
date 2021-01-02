const express = require('express')
const { 
    getReports, 
    createReport, 
    updateReport,
    deleteReport, 
    getReport, 
    getReportsBySector,
    getReportsById,
    returnVictimReportJoined,
    pushReportToDistrict,
    pushReportToNationalLevel} = require('../controllers/reports.controller')
    // const { route } = require('./ReportTypes')

const { protect,authorize } = require('../middleware/auth')


const router = express.Router({ mergeParams: true })
/**
 * @swagger
 * definitions:
 *   reports:
 *     required:          
 *       - victim_id
 *       - report_title
 *       - report_description
 *       - high_zone_area_if_available_id
 *       - status
 *     properties:
 *       report_id:
 *         type: string
 *       victim_id:
 *         type: string
 *       report_title:
 *         type: number
 *       high_zone_area_if_available_id:
 *          type: string
 *       report_description:
 *          type: string
 *       status:
 *          type: string 
 *          enum: ['ACTIVE', 'PENDING', 'DECLINED', 'CLOSED']
 *       done_on:
 *          type: string
 *       state:
 *          type: string
 */ 

/**
 * @swagger
 * /api/v1/reports:
 *   get:
 *     tags:
 *       - reports
 *     description: Get all reports
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/').get(protect,authorize('SECTOR','DISTRICT','NATIONAL'),getReports)
/**
 * @swagger
 * /api/v1/reports:
 *   post:
 *    tags:
 *      - reports
 *    description: Create a report
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: body
 *        description: Fields for a report
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/reports'
 *    responses:
 *      201:
 *        description: created
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/').post(protect,authorize('SECTOR'),createReport)
/**
 * @swagger
 * /api/v1/reports/{report_id}:
 *   put:
 *    tags:
 *      - reports
 *    description: Update a report
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: report_id
 *        in: path
 *        required: true
 *      - name: body
 *        description: Fields for a report
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/reports'
 *    responses:
 *      201:
 *        description: updated
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/:id').put(protect,authorize('SECTOR'),updateReport)
/**
 * @swagger
 * /api/v1/reports/{report_id}:
 *   delete:
 *    tags:
 *      - reports
 *    description: Update a report
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "report_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/reports'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */
router.route('/:id').delete(protect,authorize('SECTOR'),deleteReport)

router.route('/getReportsById/:id').get(protect,authorize('SECTOR'),getReportsById)
/**
 * @swagger
 * /api/v1/reports/getReportsBySector/{report_id}:
 *   get:
 *    tags:
 *      - reports
 *    description: get reports by sector 
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "report_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/reports'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/getReportsBySector/:id').get(protect,authorize('SECTOR','DISTRICT','NATIONAL'),getReportsBySector)

router.route('/pushReportToDistrictLevel/:id').put(protect,authorize('SECTOR'),pushReportToDistrict)

router.route('/pushReportToNationalLevel/:id').put(protect,authorize('DISTRICT'),pushReportToNationalLevel)

/**
 * @swagger
 * /api/v1/reports/getReportsBySector/{sector_id}:
 *   get:
 *    tags:
 *      - reports
 *    description: get reports by sector 
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "sector_id"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/definitions/reports'
 *    responses:
 *      201:
 *        description: deleted
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

 router.route('/getReportsNamesVictimsJoined').get(protect,authorize('SECTOR','DISTRICT','NATIONAL'),returnVictimReportJoined);

 
/**
 * @swagger
 * /api/v1/reports/getReportsNamesVictimsJoined:
 *   get:
 *     tags:
 *       - reports
 *     description: Get all reports
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */


module.exports = router







