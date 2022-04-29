const { Router } = require('express')

const { authController } = require('../controllers')

const verifyToken = require('../verifyToken')

const router = Router()

router.post('/register', authController.handleNewUser)

router.post('/login', authController.handleLogin)
router.post('/logout', authController.handleLogout)

router.get('/google', authController.GoogleOauthCallback)
router.get('/google/redirect', authController.GoogleOauthRedirect)
router.post('/google/user', verifyToken, authController.GoogleUserProvider)

module.exports = router
