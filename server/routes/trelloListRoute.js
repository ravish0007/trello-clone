const { Router } = require('express')

const { trelloController } = require('../controllers')

const router = Router()

router.get('/:id', trelloController.fetchAllLists)
router.post('/', trelloController.insertList)
router.put('/:id', trelloController.updateList)
router.delete('/:id', trelloController.deleteList)

module.exports = router
