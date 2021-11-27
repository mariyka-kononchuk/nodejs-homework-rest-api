const { v4 } = require('uuid')
const fs = require('fs').promises
const contactsPath = require('./filePath')
const listContacts = require('./listContacts')

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = { name, email, phone, id: v4() }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts
}

module.exports = addContact
