const express = require('express');
const ShpalljaNotFound = require('../models/shpallja_not_exist');
const { isAuth } = require('../util');
const router = express.Router();

router.get('/', isAuth, async (req, res) => {
    const messages = await ShpalljaNotFound.find({}).sort( { _id: -1 } );  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
    res.send(messages);
})

router.post('/', async (req, res) => {
    const shpallja = new ShpalljaNotFound({
        name: req.body.name,
        telephone: req.body.telephone,
        email: req.body.email,
        city: req.body.city,
        description: req.body.description,
    });
    const newShpallja = await shpallja.save();

    if(newShpallja) {
        res.send({
            success: true //kete m vyn per me shfaq postimi u shfaq me sukses masi te boj submit formen prandaj e shtova success: true 
        })
    } else {
        res.status(401).send({ msg: 'Something went wrong!' })
    }
})

router.delete('/:id', isAuth, async (req, res) => {
    const shpallja = await ShpalljaNotFound.findById(req.params.id);
    if(shpallja) {
      const deletedShpallja = await shpallja.remove();
      res.status(200).send({ msg: 'Shpallja u fshi me sukses.', data: deletedShpallja });
    } else {
      res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
});

module.exports = router;