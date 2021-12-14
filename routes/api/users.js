const express = require('express');
const router = express.Router();

const { auth, validation, controllerWrapper } = require('../../middlewares');
const { users: controller } = require('../../controllers');
const { joiSignupSchema, joiLoginSchema, joiUpdateSchema} = require('../../models/user');

router.post('/signup', validation(joiSignupSchema), controllerWrapper(controller.signup));

router.post('/login', validation(joiLoginSchema), controllerWrapper(controller.login));

router.post('/logout', auth, controllerWrapper(controller.logout));

router.patch('/', auth, validation(joiUpdateSchema), controllerWrapper(controller.updateSubscriptionUser));

module.exports = router;