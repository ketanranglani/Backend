const phoneRouter=require('express').Router()
const Note=require('../models/note')






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
phoneRouter.get('/',(req,res) => {
  Note.find({}).then(result => {
    res.json(result)

  })

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
phoneRouter.post('/',(req,res,next) => {
  const body=req.body
  // console.log(body);
  if(!body.name || !body.number){
    return res.status(400).json({
      error:'content missing',
      name: `${req.body.name}`,
      number: `${req.body.number}`,
    })
  }
  const person= new Note({

    name: String(body.name),
    number: String(body.number)
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => {
      next(error)
    })

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

const unknownEnd=(req,res) => {
  res.status(404).send(
    '<> Wrong endpoint</>'
  )
}

phoneRouter.use(unknownEnd)

module.exports = phoneRouter