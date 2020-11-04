const express = require('express')
const { 
    getReports, 
    createReport, 
    updateReport,
    deleteReport, 
    getReport } = require('../controllers/reports.controller')
    // const { route } = require('./ReportTypes')

const router = express.Router({ mergeParams: true })

router.route('/').get(getReports).post(createReport)

router.route('/:id').put(updateReport).delete(deleteReport)

module.exports = router