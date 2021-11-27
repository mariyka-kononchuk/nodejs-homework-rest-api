const createError = require('http-errors')
const contactsOperations = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      throw createError(404, `Contact with id:${contactId} not found`)
    }
    res.json({
      status: 'Success',
      code: 200,
      message: `Contact with id:${contactId} found`,
      data: {
        result: result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
