const createError = require('http-errors')
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
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    console.log('id', contactId)
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
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Contact created',
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
