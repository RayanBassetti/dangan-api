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
    const opus = new Opus({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        year: req.body.year
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
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Opus.update({_id: id}, { $set: updateOps })
        .exec()
        .then(res => res.status(201).json({message: 'Patched opus with id: ' + id}))
        .catch(err => res.status(500).json({error: err}));
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