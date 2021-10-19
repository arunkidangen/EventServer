const jwt = require('jsonwebtoken')

const db = require('./db')



const login = (userId, password) => {

  return db.User.findOne({ userId, password }).then(user => {

    if (user) {
      const token = jwt.sign({
        userId: userId
      }, 'supersecret123123')

      return {
        status: true,
        statusCode: 200,
        message: 'Logged in successfully..',
        token: token,
        currentUser: userId,
        currentUserName: user.user

      }
    } else {
      return {
        status: false,
        statusCode: 422,
        message: 'invalid username or password'
      }
    }
  })
}



const register = (user, password, userId) => {
  console.log(user, password, userId);
  return db.User.findOne({ user, password, userId }).then((result) => {
    if (result) {
      return {
        statusCode: 422,
        status: false,
        message: "user already exists..."
      }
    }
    else {
      const newUser = new db.User({
        user, password, userId
      })
      newUser.save();
      return {
        statusCode: 200,
        status: true,
        message: "user added successfully..."
      }
    }
  })
}


const addEvent = (eventName, eventDate, eventDescription, userId) => {

  return db.Event.findOne({ eventName, userId }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        status: false,
        message: "event already exists..."
      }
    } else {
      const newEvent = new db.Event({
        eventName, eventDate, eventDescription, userId
      })

      newEvent.save();
      return {

        statusCode: 200,
        status: true,
        message: "Event added successfully..."
      }
    }
  })
}




const viewEvent = (userId) => {
  return db.Event.find({ userId }).then((result) => {
    if (result) {
      console.log(result);
      return {
        status: true,
        statusCode: 200,
        message: "success",
        events: result
      }
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "Error While retierving data"
      }
    }
  })
}

const deleteEvent = (id) => {
  return db.Event.deleteOne({ id }).then((result) => {
    if (result) {
      return {
        status: true,
        statusCode: 200,
        message: "Event Deleted Successfully"
      }
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "Error occurred while deleting"
      }
    }
  })
}

const updateEvent = (id, eventDescription, eventName, eventDate) => {
  return db.Event.updateOne({ id, eventDescription, eventName, eventDate }).then((result) => {
    if (result) {
      return {
        status: true,
        statusCode: 200,
        message: "Event Updated Successfully"
      }
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "Error occurred while updating"
      }
    }
  })
}

const getEventsForTheDay = (userId,date1) => {
var eventDate=new Date ();
  var day = ("0" + eventDate.getDate()).slice(-2);
  var month = ("0" + (eventDate.getMonth() + 1)).slice(-2);
  var year = eventDate.getFullYear();

  var eventDate = year + "-" + month + "-" + day;
  console.log(eventDate)
  return db.Event.find({ userId, eventDate }).then((result) => {
    console.log(result)
    if(result){
      return {
        status:true,
        statusCode:200,
      events:result
      }
    }else{
      return {
        status:true,
        statusCode:200,
      events:""
      }
    }
  })
}
module.exports = {
  login, register, addEvent, viewEvent, deleteEvent, updateEvent, getEventsForTheDay

}