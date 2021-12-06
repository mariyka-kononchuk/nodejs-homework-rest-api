const express = require('express');
const router = express.Router();

const { validation, controllerWrapper } = require('../../middlewares');
const { users: controller } = require('../../controllers');

router.post('/signup', controllerWrapper(controller.signup));

module.exports = router;