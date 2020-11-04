const express = require('express')
const { 
    getLevels, 
    createLevel, 
    updateLevel,
    deleteLevel, 
    getLevel } = require('../controllers/Levels.controller')
    // const { route } = require('./LevelTypes')

const router = express.Router({ mergeParams: true })

router.route('/').get(getLevels).post(createLevel)

router.route('/:id').put(updateLevel).delete(deleteLevel)

module.exports = router