const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/Event',{useNewUrlParser:true})

const User= mongoose.model('User',{
    
    user:String,
    password:String,
    userId:Number,
})


const Event=mongoose.model('Event',{
    eventName: String, 
    eventDate: String,
    eventDescription:String,
    userId:Number,
})

module.exports={
    User,Event
}