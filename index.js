
//import stmt in node
const express = require('express');

// importing jwt
const jwt = require('jsonwebtoken')
const cors =require('cors')
const dataService = require('./services/dataservice')

//create application using express
 const port= process.env.PORT || 8080;
const app = express();

//to parse json data
app.use(express.json());

app.listen(port, 'localhost', () => {
  console.log('server is up..');
})
app.use(cors({
  origin:'http://localhost:4200',
  credentials:true
}))
const jwtmiddleware = (req, res, next) => {
  try {
    const token = req.headers['token']
    const data = jwt.verify(token, 'supersecret123123');
    console.log(data.userId);
    req.userId = data.userId
    next()
  } catch {
    const result = ({
      statusCode: 422,
      status: false,
      message: 'Please login'
    })
    res.status(result.statusCode).json(result);
  }
}

app.post('/login', (req, res) => {
   dataService.login(req.body.loginUserId, req.body.loginPassword).then(result => {
    res.status(result.statusCode).json(result)

  }) 
})

app.post("/register", (req,res) =>{
  dataService.register(req.body.user,req.body.password,req.body.userId).then( result =>{
    res.status(result.statusCode).json(result)
  })
})

app.post("/addEvent",jwtmiddleware, (req,res) =>{
 console.log(req);
  dataService.addEvent(req.body.eventName,req.body.eventDate,req.body.eventDescription,req.userId).then( result =>{
    res.status(result.statusCode).json(result)
  })
})

app.post("/viewEvents",jwtmiddleware,(req,res) => {
  dataService.viewEvent(req.body.currentUserId).then ( result =>{
    res.status(result.statusCode).json(result)
  })
})

app.post("/deleteEvent",jwtmiddleware,(req,res) =>{
  dataService.deleteEvent(req.body.id).then(result =>{
    res.status(result.statusCode).json(result)
  })
})

app.put("/updateEvent",jwtmiddleware,(req,res) =>{
  dataService.updateEvent(req.body.id,req.body.eventDescription,req.body.eventName,req.body.eventDate).then(result =>{
    res.status(result.statusCode).json(result)
  })
})

app.post("/getEventsForTheDay",jwtmiddleware,(req,res) =>{
  dataService.getEventsForTheDay(req.body.userId,req.body.date).then(result =>{
    res.status(result.statusCode).json(result);
  })
})
