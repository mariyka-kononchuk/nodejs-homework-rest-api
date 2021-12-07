const express = require('express');

const { auth, controllerWrapper } = require('../../middlewares');
const { users: controller } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, controllerWrapper(controller.getCurrent));

module.exports = router;