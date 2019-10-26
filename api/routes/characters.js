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
    var {name, age, status, birth_date, appears_in, talent } = req.body;
    const character = new Character({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        age: age,
        status: status,
        birth_date: birth_date,
        appears_in: appears_in,
        talent: talent
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
})

router.patch('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    const character = req.body;
    Character.findByIdAndUpdate(id, character, function(err, result) {
        if(err) {
            res.status(500).json({
                error: err
            })
        } 
        res.status(201).json({
            message: 'Character updated, id: ' + id,
            updated_character: result
        })
    })

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