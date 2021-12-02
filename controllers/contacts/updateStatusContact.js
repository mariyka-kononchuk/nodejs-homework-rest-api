const createError = require('http-errors');
const { Contact } = require('../../models');

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, { new: true });
    if (!result) {
        throw createError(404, `Contact with id:${contactId} not found`);
    }
    res.json({
        status: 'Success',
        code: 200,
        message: 'Contact updated',
        data: {
        result
        }
  });
};

module.exports = updateStatusContact;
