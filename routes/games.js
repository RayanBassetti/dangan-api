const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        games:  ["Danganronpa 1", "Danganronpa 2"]
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Game posted'
    });
});

router.get('/:gameId', (req, res, next) => {
    const id = req.params.gameId;
    if(id === "1") {
        res.status(200).json({
            name: 'Danganronpa: Trigger Happy Havoc',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'Passed an id',
            id: id
        })
    }
})

router.patch('/:gameId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated game'
    })
})

router.delete('/:gameId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted game'
    })
})



module.exports = router;