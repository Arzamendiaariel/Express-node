const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.js');
const boom = require('@hapi/boom')

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) //esto es un midleware creado para poder ver la info que mando en el body de un POST

const whitelist = ["http://127.0.0.1:5500", "https:// myapp.com"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(boom.unauthorized());;
    }
  }
}
app.use(cors(options));
// app.use(cors()) //esto habilita a cualquier dominio a que haga peticiones a la API que creamos

app.get('/', (req, res) =>{
  res.send('Hola mi server express');
});
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy nueva ruta');
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler); //el orden que se ponen los middlewares es importante, el orden determina la secuencia en que se ejecuntan los mismos.-
//logErrors tiene next() y permite que siga el error hasta errorHandler

app.listen(port, () => {
  console.log('Escuchando en puerto ' + port);
});

