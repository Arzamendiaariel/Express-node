const express = require('express');
const validatorHandler = require('../middlewares/validator.handler.js');
const UsersService = require('../services/users.sevices.js');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/User.schema');
const service = new UsersService()

const router = express.Router()


router.get('/', (req, res) => {
  const users = service.find()
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema,'params'),
  (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id); //aca utiliza la función que se creo en ./services/User.services.js
  res.json(user) //respuesta del User encontrado
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.json(newUser)
})

router.patch('/:id',
  validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res) => { //si aca le pongo put en vez de patch va a funcionar igual solo que por las conveciones REST no lo hacemos asi porque vamos a hacer actualizaciones parciales.-
  const { id } = req.params;
  const body = req.body;
  const user = service.udpate(id, body)
  res.status(user);
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const answer = service.delete(id)
  res.json(answer)
})


module.exports = router;
