const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (!favorite) {
    const allContacts = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate('owner', '_id name email');
    res.json({
    status: 'Success',
    code: 200,
    message: 'Contacts found',
    data: {
      allContacts
    }
  });
  }
  
  const searchQueryContacts = await Contact.find({ owner: _id },{ favorite }).populate('owner', '_id name email');
    
  res.json({
    status: 'Success',
    code: 200,
    message: `Contacts with favorite=${favorite} found`,
    data: {
      searchQueryContacts
    }
  });
};

module.exports = getAll;
