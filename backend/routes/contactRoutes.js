const express = require('express');
const Contact = require('../models/contact');
const { isAuth } = require('../util');
const router = express.Router();

router.get('/', isAuth, async (req, res) => {
    const contacts = await Contact.find({});  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
    res.send(contacts);
});

router.post('/register', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    const newContact = await contact.save();

    if(newContact) {
        res.send({
            _id: newContact.id,
            name: newContact.name,
            email: newContact.email,
            subject: newContact.subject,
            message: newContact.message,
        })
    } else {
        res.status(401).send({ msg: 'Invalid Contact Data.' })
    }
})


module.exports = router;