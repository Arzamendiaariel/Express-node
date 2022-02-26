//hay que poner los cuatro parametros para que se detecte que es un middleware de tipo error
// los middlewares de tipo error se deben hacer DESPUES de establecer los routings


function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
};

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    message: err.menssage,
    stack: err.stack,
  });
};

module.exports={ logErrors, errorHandler}
