const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
const Note = require('./models/note')


const app = express();


app.use(express.static('dist'))
app.use(cors())

app.use(express.json());
const mongoose = require('mongoose')




///Start of DB CONFIG




// if (process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
//   }
  
// const password = process.argv[2]
// const name=process.argv[3];
// const number=process.argv[4];





 







// const note = new Note({
//   name: ' ',
//   number: 898,
  
// })

// note.save().then(result => {
//    console.log('note saved!')
//    mongoose.connection.close()
//  }) 

  //If you define a model with the name Person, mongoose will automatically name the associated collection as people
  



///END of DB CONFIG










morgan.token('body',req=>{
    return JSON.stringify(req.body);
})
//  app.use(morgan(function(tokens,req,res){
//      return[
//          tokens.method(req,res),
//          tokens.url(req,res),
//          tokens.
//      ].join(' ')
//  }));
app.use(morgan(':method :url :body'));

 const unknownEnd=(req,res)=>{
     res.status(404).send(
         "<> Wrong endpoint</>"
     )
}



app.get("/info",(req,res)=>{
    const num=Note.length;
    const datee= new Date;
    console.log(num)
    res.send(`<h1>No of entries ${num} 
        </br>
        ${datee}
        
        </h1>`)
})
app.get("/api/persons",(req,res)=>{
    Note.find({}).then(result => {
        
            res.json(result)
          
        
        mongoose.connection.close()
      }) 
    
})

app.get("/api/persons/:id",(req,res)=>{
    const Id= req.params.id;
    const entri = persons.find(phone=> phone.id==Id);
    res.json(entri)
})
app.post("/api/persons",(req,res)=>{
    const body=req.body
    // console.log(body);
    if(!body.name || !body.number){
        return res.status(400).json({
            error:'content missing',
            name: `${req.body.name}`,
            number: `${req.body.number}`,
         });
    }
    const person={
        
        name: String(body.name),
        number: String(body.number)
    }
    
    persons=[...persons,person];
    // console.log(person);
    res.json(person)
})


app.delete("/api/persons/:id",(req,res)=>{
    const iden = req.params.id;
    console.log(iden)
    phonebook = persons.filter(person=> person.id!=iden);
    res.status(204).end()
})
app.use(unknownEnd)
const PORT = process.env.PORT||3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
