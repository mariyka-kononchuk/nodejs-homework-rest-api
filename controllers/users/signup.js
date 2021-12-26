const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models');

   
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Email ${email} in use`);
    }
    const avatarURL = gravatar.url(email);
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await User.create({ name, email, password: hashPassword, avatarURL });

    // const newUser = new User({ name, email, avatarURL });
    // newUser.setPassword(password);
    // newUser.save();
    
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                name,
                avatarURL
                
            }
        }
    })
    
}

module.exports = signup;