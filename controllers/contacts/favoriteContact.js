const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateFavoriteStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteStatus;
