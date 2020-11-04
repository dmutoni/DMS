const express = require('express')
const { 
    getUsers, 
    createUser, 
    updateUser,
    deleteUser, 
    getUser } = require('../controllers/Users.controller')
    // const { route } = require('./UserTypes')

const router = express.Router({ mergeParams: true })

router.route('/').get(getUsers).post(createUser)

router.route('/:id').put(updateUser).put(deleteUser)

module.exports = router