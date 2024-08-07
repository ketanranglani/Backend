const jwt= require('jsonwebtoken');
const phoneRouter=require('express').Router()
const Note=require('../models/note')
const User = require('../models/user');




const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
phoneRouter.get('/info',(req,res) => {
  const num=Note.length
  
  const datee= new Date
  console.log(num)
  res.send(`<h1>No of entries ${num} 
          </br>
          ${datee}
          
          </h1>`)
})


//Get all persons
phoneRouter.get('/',async (req,res) => {
  const result = await Note.find({}).populate('users',{username:1,name:1})
  res.json(result)

  

})


//Get a single person
phoneRouter.get('/:id',(req,res,next) => {


  Note.findById(req.params.id).then(note => {
    note? res.json(note) : res.status(404).end()

  })
    .catch(error => {
      next(error)


    })
})
//Edit the number of a person
phoneRouter.put('/:id',(req,res,next) => {

  let { name,number }=req.body
  number=String(number)
  console.log(name,number)
  Note.findByIdAndUpdate(req.params.id,{ name,number },{ new:true,validate:validator }).then(updatedPerson => {
    res.json(updatedPerson)
  }).catch(error => {
    console.log('must be 8')
    next(error)
  }

  )
})

//Add a person
phoneRouter.post('/',async (req,res) => {
  const body=req.body;
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  
  console.log(user);
  if(!body.name || !body.number){
    return res.status(400).json({
      error:'content missing',
      name: `${req.body.name}`,
      number: `${req.body.number}`,
    })
  }
  const person= new Note({

    name: String(body.name),
    number: String(body.number),
    users: user.id
  })
  const savedPerson = await person.save()
  user.entries=user.entries.concat(savedPerson._id)
  await user.save()

  res.status(201).json(savedPerson);
  
    

  // console.log(person);

})

//Update a person
phoneRouter.delete('/api/persons/:id',(req,res,next) => {
  const iden = req.params.id
  console.log(iden)
  Note.findByIdAndDelete(iden).then(() => {
    res.status(204).end()
  })
    .catch(error => {
      next(error)
    })

})

// const unknownEnd=(req,res) => {
//   res.status(404).send(
//     '<> Wrong endpoint</>'
//   )
// }

//phoneRouter.use(unknownEnd)

module.exports = phoneRouter