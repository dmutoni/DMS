const express = require('express')
const { 
    getVictims, 
    createVictim, 
    updateVictim,
    deleteVictim, 
    getVictim } = require('../controllers/victims.controller')
    // const { route } = require('./VictimTypes')

const router = express.Router({ mergeParams: true })

router.route('/').get(getVictims).post(createVictim)

router.route('/:id').put(updateVictim).delete(deleteVictim)

module.exports = router