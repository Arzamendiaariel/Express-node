const Joi = require('joi');

const id = Joi.string().uuid();
const categories = Joi.string().alphanum().min(2).max(20)
const image = Joi.string().uri()

const createCategorySchema = Joi.object({
  categories:categories.required(),
  image:image.required()

});

const updateCategorySchema = Joi.object({
  categories:categories,
  image:image
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports={ createCategorySchema, updateCategorySchema, getCategorySchema}

