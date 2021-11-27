const listContacts = require('./listContacts')
const contactsPath = require('./filePath')
const fs = require('fs').promises

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id == contactId)
  if (index === -1) {
    return null
  }
  contacts[index] = { ...body, contactId }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[index]
}

module.exports = updateContactById
