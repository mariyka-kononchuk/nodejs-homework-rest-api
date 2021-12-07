const express = require('express');
const router = express.Router();

const { validation, controllerWrapper } = require('../../middlewares');
const { users: controller } = require('../../controllers');
const { joiSignupSchema, joiLoginSchema} = require('../../models/user');

router.post('/signup', validation(joiSignupSchema), controllerWrapper(controller.signup));

router.post('/login', validation(joiLoginSchema), controllerWrapper(controller.login));

module.exports = router;