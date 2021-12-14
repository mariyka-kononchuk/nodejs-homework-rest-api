const { User } = require('../../models');

const updateSubscriptionUser = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body
    
    const result = await User.findByIdAndUpdate(_id, { subscription: subscription }, { new: true });
    
    res.json({
        status: 'Success',
        code: 200,
        message: 'User updated',
        data: {
        result
        }
  });
};

module.exports = updateSubscriptionUser;
