const { Router } = require('express')

const { authController } = require('../controllers')

const router = Router()

router.post('/register', authController.handleNewUser)

router.post('/login', authController.handleLogin)
router.post('/logout', authController.handleLogout)

// deprecate after updating frontend
router.post('/auth', authController.handleLogin)

module.exports = router
