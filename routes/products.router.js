const express = require('express');
const faker = require('faker');

const router = express.Router()


router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit= size || 10
  for (let i = 0; i < limit; i++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker .image.imageUrl()
    })
  }
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('yo soy un filtro')
}); // esto es un error, lo toma como un parámetro de la ruta 'products/:id'; para solucionarlo hay que ubicarlo arriba de la ruta dinamica
//endpoints especificos deben ir ANTES de los endpoints dinámicos (los que tienen los ':')

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Alienware 500',
    price: 3500
  })
});

module.exports = router
