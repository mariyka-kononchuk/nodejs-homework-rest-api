const { Conflict } = require('http-errors');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models');
const {sendEmail} = require('../../utils');

   
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Email ${email} in use`);
    }
    const avatarURL = gravatar.url(email);
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationToken = nanoid();

    const result = await User.create({ name, email, password: hashPassword, avatarURL, verificationToken  });

    // const newUser = new User({ name, email, avatarURL });
    // newUser.setPassword(password);
    // newUser.save();

    const mail = {
        to: email,
        subject: 'Confirm email',
        html:`<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"><Confirm email/a>`
    }

    await sendEmail(mail);
    
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                name,
                avatarURL,
                verificationToken
            }
        }
    })
    
}

module.exports = signup;