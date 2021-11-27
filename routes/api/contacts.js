const express = require('express')
const router = express.Router()

const { validation } = require('../../middlewares')
const { contactScheme } = require('../../schemas')
const { contacts: controller } = require('../../controllers')

const validateMiddleWare = validation(contactScheme)

router.get('/', controller.getAll)

router.get('/:contactId', controller.getById)

router.post('/', validateMiddleWare, controller.add)

router.delete('/:contactId', controller.removeById)

router.put('/:contactId', validateMiddleWare, controller.updateById)

module.exports = router
