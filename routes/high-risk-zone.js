const express = require('express')
const { 
    get_h_zones, 
    create_h_zone, 
    update_h_zone,
    delete_h_zone, 
    get_h_zone } = require('../controllers/high-risk-zone.controller')
    // const { route } = require('./_h_zoneTypes')

const router = express.Router({ mergeParams: true })

router.route('/').get(get_h_zones).post(create_h_zone)

router.route('/:id').put(update_h_zone).delete(delete_h_zone)

module.exports = router