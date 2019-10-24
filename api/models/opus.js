const mongoose = require('mongoose');

const opusSchema = mongoose.Schema({ // initiate a schema
    _id: mongoose.Schema.Types.ObjectId, // _id is by convention, ObjectId generates a serial number for it
    name: String,
    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Opus', opusSchema); // takes 2 parameters : the name of the object, and the schema it's based on