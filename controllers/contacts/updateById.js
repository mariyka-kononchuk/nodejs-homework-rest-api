const createError = require('http-errors')
const Joi = require('joi')
const contactsOperations = require('../../model')

const contactScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
})

const updateById = async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContactById(contactId, req.body)
    if (!result) {
      throw createError(404, `Contact with id:${contactId} not found`)
    }
    res.json({
      status: 'Success',
      code: 200,
      message: 'Contact updated',
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
