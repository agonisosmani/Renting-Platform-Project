const express = require('express');
const Komuna = require('../models/komuna');
const { isAuth } = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
    const komunat = await Komuna.find({});  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
    res.send(komunat);
});

router.post('/', isAuth, async (req, res) => {
    const komuna = new Komuna({
        name: req.body.name,
    });
    const newKomuna = await komuna.save();

    if(newKomuna) {
        res.send({
            _id: newKomuna.id,
            name: req.body.name,
            success: true //kete m vyn per me shfaq postimi u shfaq me sukses masi te boj submit formen prandaj e shtova success: true
        })
    } else {
        res.status(401).send({ msg: 'Something went wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    Komuna.findById(id, (err, data) => {
        if(err) return res.json({message: 'Komuna nuk ekziston.'});
        res.send(data);
    });
});

router.delete('/:id', isAuth, async (req, res) => {
    const komuna = await Komuna.findById(req.params.id);
    if(komuna) {
      const deletedKomuna = await komuna.remove();
      res.status(200).send({ msg: 'Komuna u fshi me sukses.', data: deletedKomuna });
    } else {
      res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
});

module.exports = router;