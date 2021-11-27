const createError = require('http-errors')
const Joi = require('joi')
const contactsOperations = require('../../model')
const express = require('express')
const router = express.Router()

const contactScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  id: Joi.string().required()
})

const contactScheme2 = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
  id: Joi.string()
})

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
    const { error } = contactScheme.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
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

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactScheme2.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContactById(contactId, req.body)
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
})

module.exports = router
