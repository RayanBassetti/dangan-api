const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');

const Opus = require('../models/opus');

router.get('/', (req, res, next) => {
    Opus.find()
        // .where() adds conditions
        // .limit()
        // .select('keys of an object') gets only the keys asked here
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
            // if (docs.length >= 0) { // if it's not empty
            //     res.status(200).json(docs);
            // } else {
            //     res.status(204).json({
            //         message: 'No content'
            //     })
            // }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    var {name, year} = req.body;
    const opus = new Opus({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        year: year
    });
    opus
        .save() // store in the database
        .then(result => {
            console.log(result); 
            res.status(201).json({
                message: 'opus posted',
                createdOpus: opus
            });
        }) // store in the database
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error - Failed to post Opus',
                error: err
            });
        });
});

router.get('/:opusId', (req, res, next) => {
    const id = req.params.opusId;
    Opus.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No opus found with this id: ' + id})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
})

router.patch('/:opusId', (req, res, next) => {
    const id = req.params.opusId;
    const opus = req.body;
    Opus.findByIdAndUpdate(id, opus, function(err, result) {
        if(err) {
            res.status(500).json({
                err: err
            })
        }
        res.status(201).json({
            message: 'Opus updated, id: ' + id,
            updated_opus: result
        })
    })
})

router.delete('/:opusId', (req, res, next) => {
    const id = req.params.opusId;
    Opus.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})



module.exports = router;