const express = require('express');
const faker = require('faker');
const app = express();
const port = 3008;

app.get('/', (req, res) => {
  res.send('Hola mi server express');
});
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy nueva ruta');
});




app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros')
  }
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
})


app.listen(port, () => {
  console.log('Escuchando en puerto ' + port);
});
