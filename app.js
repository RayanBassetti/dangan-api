const express = require('express');
const app = express();
const morgan = require('morgan');

const gamesRouter = require('./routes/games');
const charactersRouter = require('./routes/characters');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // extract json data and makes it readable 

app.use((req, res, next) => { // middleware that ensures that cors errors are prevented
    res.header('Access-Control-Allow-Origin', '*'); // allow the access of the api, to all clients/websites asking
    res.header('Access-Control-Allow-Headers', '*'); // which kind of header we want to accept 
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/characters', charactersRouter)
app.use('/games', gamesRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;