const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user');


router.post('/signup', (req, res, next) => {
    const {email, password} = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: password
    })
    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'user created',
                createdUser: user
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error - Failed to create User',
                error: err
            })
        })
})

module.exports = router;