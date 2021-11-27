const express = require('express')
const router = express.Router()
const { contacts: controller } = require('../../controllers')

router.get('/', controller.getAll)

router.get('/:contactId', controller.getById)

router.post('/', controller.add)

router.delete('/:contactId', controller.removeById)

router.put('/:contactId', controller.updateById)

module.exports = router
