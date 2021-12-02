
const { Contact } = require('../../models');
const createError = require('http-errors');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId, req.body);
  if (!result) {
    throw createError(404, `Contact with id:${contactId} not found`)
  };
  res.json({
    status: 'Success',
    code: 200,
    message: 'Contact deleted',
    data: {
      result
    }
  });
};

module.exports = removeById;
