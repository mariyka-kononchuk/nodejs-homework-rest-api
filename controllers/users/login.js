const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new Unauthorized(`Email ${email} is wrong`);
    }

    const passCompare = bcrypt.compareSync(password, user.password);

    if (!passCompare) {
        throw new Unauthorized('Password is wrong');
    }

    const result = await User.create({ name, email, password: hashPassword });
    
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

module.exports = login;