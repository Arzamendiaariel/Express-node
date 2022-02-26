//hay que poner los cuatro parametros para que se detecte que es un middleware de tipo error
// los middlewares de tipo error se deben hacer DESPUES de establecer los routings


function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
};

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
};


module.exports={ logErrors, errorHandler, boomErrorHandler }
