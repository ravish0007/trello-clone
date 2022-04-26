const { Router } = require('express')

const { trelloController } = require('../controllers')

const router = Router()

router.get('/:listID', trelloController.getCards)
router.post('/', trelloController.insertCard)
router.put('/:id', trelloController.updateCard)
router.delete('/:id', trelloController.deleteCard)
router.patch('/', trelloController.moveCard)

module.exports = router
