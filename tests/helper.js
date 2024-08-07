const User= require('../models/note')
const usersInDb=async()=>{
    const users= await User.find({});
    return users.map(user=>user.toJSON());
}

module.exports= {usersInDb}