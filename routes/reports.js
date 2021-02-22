const express=require('express')
const {getTotalPendingReports} = require("../controllers/reports.controller");
const {getTotalClosedReports} = require("../controllers/reports.controller");
const {getTotalDeclinedReports} = require("../controllers/reports.controller");
const {getTotalReports} = require("../controllers/reports.controller");
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
    pushReportToNationalLevel}=require('../controllers/reports.controller')
// const { route } = require('./ReportTypes')

const {protect,authorize} = require('../middleware/auth')


const router=express.Router({mergeParams: true})
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
router.route('/:type').get(getReports);

/**
 * @swagger
 * /api/v1/reports/getReports/{type}:
 *   get:
 *    tags:
 *      - users
 *    description: get reports by type specifiy if -all , -pending , -closed , -declined
 *    consumes:
 *      - "application/json"
 *      - "application/xml"
 *    produces:
 *      - "application/xml"
 *      - "application/json"
 *    parameters:
 *      - name: "type"
 *        in: path
 *        required: true
 *        schema:
 *          $ref: '#/components/reports'
 *    responses:
 *      201:
 *        description: success
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server error
 */

router.route('/getTotalReports').get(getTotalReports);

/**
 * @swagger
 * /api/v1/reports/getTotalReports:
 *   get:
 *     tags:
 *       - reports
 *     description: Get total number reports
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/getTotalDeclinedReports').get(getTotalDeclinedReports);

/**
 * @swagger
 * /api/v1/reports/getTotalDeclinedReports:
 *   get:
 *     tags:
 *       - reports
 *     description: Get all declined reports
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/getTotalClosedReports').get(getTotalClosedReports);

/**
 * @swagger
 * /api/v1/reports/getTotalClosedReports:
 *   get:
 *     tags:
 *       - reports
 *     description: Get all closed reports
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */

router.route('/getTotalPendingReports').get(getTotalPendingReports);

/**
 * @swagger
 * /api/v1/reports/getTotalPendingReports:
 *   get:
 *     tags:
 *       - reports
 *     description: Get all pending reports
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server error
 */


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

router.route('/').post(createReport)
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

router.route('/:id').put(updateReport)
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
router.route('/:id').delete(deleteReport)
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

router.route('/getReportsById/:id').get(getReportsById)
/**
 * @swagger
 * /api/v1/reports/getReportsById/{report_id}:
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

router.route('/getReportsBySector/:id').get(getReportsBySector)

router.route('/pushReportToDistrictLevel/:id').put(pushReportToDistrict)

router.route('/pushReportToNationalLevel/:id').put(pushReportToNationalLevel)

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

router.route('/getReportsNamesVictimsJoined').get(returnVictimReportJoined);


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


module.exports=router







