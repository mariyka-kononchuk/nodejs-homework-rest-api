const listContacts = require('./listContacts')
const contactsPath = require('./filePath')
const fs = require('fs').promises

const updateContactById = async (id, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id == id)
  if (index === -1) {
    return null
  }
  contacts[index] = { ...body, id }
  // const updatedContact = { name, email, phone, ...contacts[index] }
  // contacts.splice(index, 1, updatedContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[index]
}

module.exports = updateContactById
