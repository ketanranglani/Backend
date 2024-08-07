const mongoose = require('mongoose')

const Note = require('./note')
mongoose.set('strictQuery', false)



const userSchema = new mongoose.Schema({
    username: {
      type:String,
      
      unique: true// this ensures the uniqueness of the username
    },
    name:String,
    passwordHash: {
      type: String,
      
    },
    entries: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }]
  })
  userSchema.set('toJSON',{
    transform:(document,returnObj)=>{
      returnObj.id=returnObj._id.toString()
      delete returnObj._id;
      delete returnObj.__v;
      delete returnObj.passwordHash
    }
  })

module.exports = mongoose.model('User',userSchema)