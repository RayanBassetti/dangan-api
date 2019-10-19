const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        characters:  ["Chiaki", "Hinata"]
    });
});

router.post('/', (req, res, next) => {
    const character = {
        name: req.body.name,
        gameId: req.body.gameId
    };
    res.status(201).json({
        message: 'Character posted',
        createdCharacter: character
    });
});

router.get('/:characterId', (req, res, next) => {
    const id = req.params.characterId;
    if(id === "1") {
        res.status(200).json({
            name: 'Hinata Hajime',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'Passed an id',
            id: id
        })
    }
})

router.patch('/:characterId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated character'
    })
})

router.delete('/:gameId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted character'
    })
})

module.exports = router;