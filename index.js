const  { PORT } =  require('./utils/config')
const app=require('./app')
const logger=require('./utils/logger')




app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})


//  app.use(morgan(function(tokens,req,res){
//      return[
//          tokens.method(req,res),
//          tokens.url(req,res),
//          tokens.
//      ].join(' ')
//  }));









