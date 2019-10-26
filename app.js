const express = require('express');
const app = express();
const morgan = require('morgan'); // allows us to see in the console the results of our cruds operations on the API 
const mongoose = require('mongoose'); // library to connect to MongoDb

//importing the routes
const opusRouter = require('./api/routes/opus');
const charactersRouter = require('./api/routes/characters');

// connecting to the mongodb
mongoose.connect('mongodb+srv://RBPerso:'+ process.env.MONGO_ATLAS_PW + '@dangan-api-cluster-jxfb0.mongodb.net/test?retryWrites=true&w=majority',
                 {useNewUrlParser: true})

app.use(morgan('dev')); //setting up dev mode
app.use(express.urlencoded({extended: false})); // body-parser, set to false because we don't need extra information
app.use(express.json()); // extract json data and makes it readable 


// middleware that ensures that cors errors are prevented
app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*'); // allow the access of the api, to all clients/websites asking
    res.header('Access-Control-Allow-Headers', '*'); // which kind of header we want to accept 
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

// importing routes 
app.use('/characters', charactersRouter) 
app.use('/opus', opusRouter);

// //middleware to handle errors
// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
// })

// app.use((error, req, res, next) => {
//     res.status(err.status || 500).json({
//         error: {
//             message: error.message
//         }
//     })
// })

module.exports = app;