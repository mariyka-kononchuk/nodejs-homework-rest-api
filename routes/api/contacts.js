const express = require('express');
const router = express.Router();

const { validation, controllerWrapper } = require('../../middlewares');
const { joiSchema, statusJoiSchema } = require('../../models/contact');
const { contacts: controller } = require('../../controllers');

// const validateMiddleWare = validation(contactScheme)

router.get('/', controllerWrapper(controller.getAll));

router.get('/:contactId', controllerWrapper(controller.getById));

router.post('/', validation(joiSchema), controllerWrapper(controller.add));

router.delete('/:contactId', controllerWrapper(controller.removeById));

router.put('/:contactId', validation(joiSchema), controllerWrapper(controller.updateById));

router.patch('/:contactId/favorite', validation(statusJoiSchema), controllerWrapper(controller.updateStatusContact));

module.exports = router;
