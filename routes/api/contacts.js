const contactsOperations = require('../../model')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'Success',
      code: 200,
      message: 'Contacts found',
      data: {
        result: contacts
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      code: 500,
      message: 'Server error'
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    console.log('id', contactId)
    const result = await contactsOperations.getContactById(contactId)
    res.json({
      status: 'Success',
      code: 200,
      message: `Contact with id:${contactId} found`,
      data: {
        result: result
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      code: 500,
      message: 'Server error'
    })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
