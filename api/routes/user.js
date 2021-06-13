const express = require('express')
const UserController = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/users', authenticate,  UserController.getAllUser)

module.exports = router