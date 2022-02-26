const express = require('express');
const ProductsService = require('../services/product.services');
const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema')
const service = new ProductsService(); //nueva instancia de servicios (de productos)
const router = express.Router()

router.get('/', async (req, res) => {
  const products = await service.find() //utilizamos el metodo creado enen ./services/product.services.js
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('yo soy un filtro')
}); // esto es un error, lo toma como un parámetro de la ruta 'products/:id'; para solucionarlo hay que ubicarlo arriba de la ruta dinamica
//endpoints especificos deben ir ANTES de los endpoints dinámicos (los que tienen los ':')

router.get('/:id',
  validatorHandler(getProductSchema,'params'),//primero el middleware de validación de datos
  async (req, res, next) => { //luego este middleware de ejecución
    try {
      const { id } = req.params;
      const product = await service.findOne(id); //aca utiliza la función que se creo en ./services/product.services.js
      res.json(product) //respuesta del producto encontrado
    } catch (error) {
      next(error);//aca explicitamente lo mando a que ejecute los middlewares tipo error que tengo declarados en la carpeta middleware
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.json(newProduct)
})

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),//se ponen 2 middlewares porque tengo como parametros tanto el 'params como el body, entonces valido los dos por separado
  validatorHandler(updateProductSchema,'body'),
  async (req, res, next) => { //si aca le pongo put en vez de patch va a funcionar igual solo que por las conveciones REST no lo hacemos asi porque vamos a hacer actualizaciones parciales.-
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.udpate(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
})


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer =  await service.delete(id)
  res.json(answer)
})


module.exports = router;
