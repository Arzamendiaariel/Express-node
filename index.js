const express = require('express');
const routerApi = require('./routes/index.js');

const { logErrors, errorHandler} = require('./middlewares/error.handler.js');

const app = express();
const port = 3000;

app.use(express.json()) //esto es un midleware creado para poder ver la info que mando en el body de un POST

app.get('/', (req, res) =>{
  res.send('Hola mi server express');
});
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy nueva ruta');
});

routerApi(app);
app.use(logErrors);
app.use(errorHandler); //el roden que se ponen los middlewares es importante, el orden determina la secuencia en que se ejecuntan los mismos.-
//logErrors tiene next() y permite que siga el error hasta errorHandler

app.listen(port, () => {
  console.log('Escuchando en puerto ' + port);
});

