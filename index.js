const express = require('express');
const app = express();
app.use(express.static('dist'))
const morgan = require('morgan');
const cors = require('cors')
app.use(cors())

app.use(express.json());


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

app.use(express.json());
app.use(morgan(':method :url :body'));

let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
 const unknownEnd=(req,res)=>{
     res.status(404).send(
         "<> Wrong endpoint</>"
     )
}


// app.get("/",(req,res)=>{
//     express.static('dist')
// })
app.get("/info",(req,res)=>{
    const num= Math.max(...persons.map(note=> note.id ))
    const datee= new Date;
    console.log(num)
    res.send(`<h1>No of entries ${num} 
        </br>
        ${datee}
        
        </h1>`)
})
app.get("/api/persons",(req,res)=>{
    res.json(persons)
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
        id: String(Math.floor(Math.random() * 200)),
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
