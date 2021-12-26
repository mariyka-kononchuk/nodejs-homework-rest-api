const { NotFound } = require('http-errors');
const { User } = require('../../models');

const verifyEmail = async (rew, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw NotFound();
    }
    await User.findOneAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        message: 'Verification successful'
    })
}

module.exports = verifyEmail;