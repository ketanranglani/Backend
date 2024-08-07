const bcrypt = require('bcrypt')
const userRouter = require('express').Router();
const User=require('../models/user')
const Note = require('../models/note')
userRouter.post('/',async(req,res)=>{
    const {name,password,username} = req.body;
    const saltRounds =10;
    const passwordHash = await bcrypt.hash(password,saltRounds);
    const user = new User({
        name,
        username,
        passwordHash,
        
    })
    const savedPerson= await user.save();
    res.status(201).json(savedPerson);

})
userRouter.get('/',async(req,res)=>{
    const respose = await User.find({}).populate('entries',{name:1,number:1})
    res.json(respose)
})


module.exports= userRouter