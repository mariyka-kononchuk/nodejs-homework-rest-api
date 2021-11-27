const contactsOperations = require('../../model')

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'Success',
    code: 200,
    message: 'Contacts found',
    data: {
      result: contacts
    }
  })
}

module.exports = getAll
