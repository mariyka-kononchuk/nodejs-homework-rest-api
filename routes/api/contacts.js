const express = require('express')
const router = express.Router()

const { validation, controllerWrapper } = require('../../middlewares')
const { contactScheme } = require('../../schemas')
const { contacts: controller } = require('../../controllers')

const validateMiddleWare = validation(contactScheme)

router.get('/', controllerWrapper(controller.getAll))

router.get('/:contactId', controllerWrapper(controller.getById))

router.post('/', validateMiddleWare, controllerWrapper(controller.add))

router.delete('/:contactId', controllerWrapper(controller.removeById))

router.put('/:contactId', validateMiddleWare, controllerWrapper(controller.updateById))

module.exports = router
