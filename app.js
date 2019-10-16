const express = require('express');
const app = express();
const gamesRouter = require('./routes/games');
const charactersRouter = require('./routes/characters');

app.use('/characters', charactersRouter)
app.use('/games', gamesRouter);

module.exports = app;