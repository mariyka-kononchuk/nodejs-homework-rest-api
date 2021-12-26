const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { verifyEmail } = require('./verifyEmail');
const createError = require('http-errors');

const resendEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw createError(400, `Missing required field email`);
    }
    const user = await User.findOne({ email });
    verifyEmail();

}

module.exports = resendEmail;