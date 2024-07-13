const mongoose = require('mongoose')


if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
const password = process.argv[2]
const name=process.argv[3];
const number=process.argv[4];
const url= `mongodb+srv://ketannn07:${password}@phonecluster.qcp3mnz.mongodb.net/phonebook?retryWrites=true&w=majority&appName=phoneCluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: name,
  number: number,
  
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// }) 

  //If you define a model with the name Person, mongoose will automatically name the associated collection as people
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(`${note.name} ${note.number}`)
    })
    mongoose.connection.close()
  }) 