const listContacts = require('./listContacts')
const contactsPath = require('./filePath')
const fs = require('fs').promises

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id == contactId)
  if (index === -1) {
    return null
  }
  const [removedContact] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return [removedContact]
}

module.exports = removeContact
