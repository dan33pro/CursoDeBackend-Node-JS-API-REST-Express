const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(20).max(500);
const image = Joi.string().uri();
const categoryID = Joi.number().integer().min(1).max(20);

const createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image.required(),
    categoryID: categoryID.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    description: description,
    price: price,
    image: image,
    categoryID: categoryID,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const getProductsWithNameSchema = Joi.object({
    nane: name.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, getProductsWithNameSchema };