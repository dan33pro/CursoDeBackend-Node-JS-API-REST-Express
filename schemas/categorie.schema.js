const Joi = require('joi');

const id = Joi.number().min(1).max(20);

const getCategorieSchema = Joi.object({
    id: id.required(),
});

module.exports = { getCategorieSchema };