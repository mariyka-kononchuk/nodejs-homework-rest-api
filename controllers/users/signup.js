const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const { User } = require('../../models');
   
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Email ${email} in use`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ name, email, password:hashPassword});
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                name
            }
        }
    })
    
}

module.exports = signup;