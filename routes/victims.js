const express = require('express')
const { 
    getVictims, 
    createVictim, 
    updateVictim,
    deleteVictim, 
    loginVictim,
    getVictimById,
    getVictim } = require('../controllers/victims.controller')
    // const { route } = require('./VictimTypes')
const { protect,authorize } = require('../middleware/auth')

const router = express.Router({ mergeParams: true })

router.route('/').get(getVictims)

router.route('/').post(createVictim)

router.route('/login').post(loginVictim)

router.route('/:id').put(updateVictim)

router.route('/:id').delete(deleteVictim)

router.route('/getVictimById:id').get(getVictimById)

module.exports = router
