const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Character = require('../models/character');

router.get('/', (req, res, next) => {
    Character.find()
             .exec()
             .then(docs => {
                 console.log(docs);
                 res.status(200).json(docs);
             })
             .catch(err => {
                 res.status(500).json({
                     error: err
                 })
             });
});

router.post('/', (req, res, next) => {
    var {name, age, status, birth_date, appears_in } = req.body;
    const character = new Character({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        age: age,
        status: status,
        birth_date: birth_date,
        appears_in: appears_in
    });
    character.save()
             .then(result => {
                 console.log(result);
                 res.status(201).json(result);
             })
             .catch(err => {
                 console.log(err);
                 res.status(500).json({
                     error: err
                 });
             });
});

router.get('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    Character.findById(id)
             .exec()
             .then(result => {
                 res.status(200).json(result)
             })
             .catch(err => {
                 res.status(500).json({
                     error: err
                 })
             });
    if(id === "999") {
        res.status(200).json({
            name: 'Hinata Hajime',
            id: id
        })
    }
})

router.patch('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    const body = req.body;
    const updateOps = {};
    for (const ops in body) {
        updateOps[ops.propName] = ops.value;
    }
    Character.update({_id: id}, { $set: updateOps })
        .exec()
        .then(res => 
            res.status(201).json({
                message: 'Patched opus with id: ' + id
            })
        )
        .catch(err => 
            res.status(500).json(
                {error: err})
        );
})

router.delete('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    Character.remove({_id: id})
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