const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({
content:{
    type:String
},

roomId:{
  //type:mongoose.Schema.Types.ObjectId
  type: String, // Define the appropriate data type (e.g., String)
  required: true, // Add any other necessary validation rules

},
sender:{
    type:String
}

})

const Chat=mongoose.model('chat',chatSchema);

module.exports = Chat;
