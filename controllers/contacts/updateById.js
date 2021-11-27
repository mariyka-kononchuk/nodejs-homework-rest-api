const createError = require('http-errors')
const contactsOperations = require('../../model')

const updateById = async (req, res, next) => {
  try {
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
