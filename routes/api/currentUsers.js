const express = require('express');

const { auth, upload, controllerWrapper } = require('../../middlewares');
const { currentUsers: controller } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, controllerWrapper(controller.getCurrent));
router.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(controller.updateAvatar));
router.get('/verify/:verificationToken',controllerWrapper(controller.verifyEmail))

module.exports = router;