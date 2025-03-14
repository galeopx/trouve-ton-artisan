const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Une erreur est survenue sur le serveur';
    
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  };
  
  module.exports = errorHandler;