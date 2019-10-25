const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({ // initiate a schema
    _id: mongoose.Schema.Types.ObjectId, // _id is by convention, ObjectId generates a serial number for it
    name: String,
    age: Number,
    birth_date: String,
    status: String,
    appears_in: String,
    talent: String
});

module.exports = mongoose.model('Character', characterSchema); // takes 2 parameters : the name of the object, and the schema it's based on