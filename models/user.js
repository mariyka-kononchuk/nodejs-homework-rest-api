const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },

}, { versionKey: false, timestamps: true });

const joiSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    token:Joi.string()
});

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
});
   
const joiUpdateSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
   });

const User = model('user', userSchema);

module.exports = {
    User,
    joiSignupSchema,
    joiLoginSchema,
    joiUpdateSchema
};