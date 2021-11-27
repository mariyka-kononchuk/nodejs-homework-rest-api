const Joi = require('joi')
const contactsOperations = require('../../model')

const contactScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

const add = async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Contact created',
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
