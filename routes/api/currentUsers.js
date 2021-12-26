const express = require('express');

const { auth, upload, validation, controllerWrapper } = require('../../middlewares');
const { joiResendEmailSchema } = require('../../models/user');
const { currentUsers: controller } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, controllerWrapper(controller.getCurrent));
router.patch('/avatars', auth, upload.single('avatar'), controllerWrapper(controller.updateAvatar));
router.get('/verify/:verificationToken', controllerWrapper(controller.verifyEmail));
router.post('/verify', validation(joiResendEmailSchema), controllerWrapper(controller.resendEmail));

module.exports = router;