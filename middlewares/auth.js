const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    console.log("req.user");
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    
    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized('Not authorized');
        };
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            throw new Unauthorized('Not authorized');
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("req.user");
        if (error.message = 'Invalid signature') {
            error.status = 401;
        };
        throw error;
    }
}

module.exports = auth;