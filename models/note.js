
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)




const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type:String,
    validate: {
      validator: function(v){
        return /\d{2}-\d{7}/.test(v)
      }
    },
    required: [true]

  },

})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)