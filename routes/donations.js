const express = require('express')
const { 
    getDonations, 
    createDonation, 
    updateDonation,
    deleteDonation, 
    getDonation } = require('../controllers/donations.contoller')
    // const { route } = require('./DonationTypes')

const router = express.Router({ mergeParams: true })

router.route('/').get(getDonations).post(createDonation)

router.route('/:id').put(updateDonation).delete(deleteDonation)

module.exports = router