const express = require('express');
const CategoriesService = require('../services/categories.services');
const service = new CategoriesService();
const router = express.Router()

router.get('/', (req, res) => {
  const categories = service.find()
  res.json(categories);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id); //aca utiliza la función que se creo en ./services/product.services.js
  res.json(category) //respuesta del producto encontrado
});

router.post('/',(req, res)=> {
  const body = req.body;
  const newCategory = service.create(body);
  res.json(newCategory)
})

router.patch('/:id', (req, res) => { //si aca le pongo put en vez de patch va a funcionar igual solo que por las conveciones REST no lo hacemos asi porque vamos a hacer actualizaciones parciales.-
  const { id } = req.params;
  const body = req.body;
  const product = service.udpate(id, body)
  res.status(product);
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const answer = service.delete(id)
  res.json(answer)
})
module.exports = router;
