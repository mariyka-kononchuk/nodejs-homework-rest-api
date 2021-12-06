const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const result = await Contact.find({});
  res.json({
    status: 'Success',
    code: 200,
    message: 'Contacts found',
    data: {
      result
    }
  });
}

module.exports = getAll;
