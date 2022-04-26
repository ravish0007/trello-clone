const { Router } = require('express')

const { userController } = require('../controllers')

const router = Router()

router.post('/register', userController.handleNewUser)
router.post('/auth', userController.handleLogin)

module.exports = router
