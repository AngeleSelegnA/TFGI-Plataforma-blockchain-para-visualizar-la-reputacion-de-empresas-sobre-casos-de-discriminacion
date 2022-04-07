const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  l_id :{ type : String, required : true, unique : true},
  u_name : { type : String, required : true, unique : true}
  
}, { collection : 'userInfo' })

const User = new mongoose.model('userInfo', UserSchema)
module.exports = User
