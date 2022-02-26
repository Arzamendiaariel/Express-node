const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const last_name = Joi.number().integer().min(10);
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const image = Joi.string().uri()

const createUserSchema = Joi.object({
  name: name.required(),
  last_name:last_name.required(),
  email: email.required(),
  image:image.required()

});

const updateUserSchema = Joi.object({
  name: name,
  last_name: last_name,
  email:email,
  image:image
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };

