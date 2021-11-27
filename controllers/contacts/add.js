const contactsOperations = require('../../model')

const add = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'Success',
    code: 201,
    message: 'Contact created',
    data: {
      result
    }
  })
}

module.exports = add
