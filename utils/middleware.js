const logger = require('./logger')
const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}



const unknownEnd=(req,res) => {
  res.status(404).send(
    '<> Wrong endpoint</>'
  )
}



const errorHandler = (error, request, response, next) => {

  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })

  }else if(error.name==='MongoError'){
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
}else if (error.name === 'TokenExpiredError') {
  return response.status(401).json({
    error: 'token expired'
  })
}
next(error)
}

module.exports = { requestLogger, unknownEnd, errorHandler }