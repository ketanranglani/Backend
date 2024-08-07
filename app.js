const express = require('express')
const app = express()
const middleware=require('./utils/middleware')
const cors = require('cors')
const mongoose=require('mongoose')
const config=require('./utils/config')
const logger=require('./utils/logger')
const morgan = require('morgan')
require('express-async-errors')


app.use(express.json())
const phoneRouter = require('./controller/notes')
const userRouter=require('./controller/users')
const loginRouter = require('./controller/login')
app.use(morgan('tiny'))
app.use('/api/persons', phoneRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)



mongoose.connect(config.url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.info( `'error connecting to MongoDB:', ${error.message}` )
  })


app.use(cors())
app.use(express.static('dist'))

app.use(middleware.unknownEnd)
// app.use(middleware.errorHandler)

app.use(middleware.requestLogger)


module.exports = app