const express = require('express');
const Member = require('../models/member_review');
const { isAuth } = require('../util');
const router = express.Router();

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);// Make sure to parse the skip to number
 
    const members = await Member.find({}).skip(skip).limit(limit); //limit i bjen page size mdoket.
    res.send(members);
});

//kjo metod na vyn per member slider aty n home page me dit per butonat next-page kur me qit kur jo.
router.get('/membersNumber', async (req, res) => {
    const members = await Member.find({});  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
    res.send({'MemberLength': members.length});
});

router.post('/', isAuth, async (req, res) => {
    const member = new Member({
        name: req.body.name,
        description: req.body.description
    });
    const newMember = await member.save();

    if(newMember) {
        res.send({
            name: newMember.name,
            description: newMember.description,
            success: true
        })
    } else {
        res.status(401).send({ msg: 'Invalid Member_Reviews Data.' })
    }
});
router.delete('/:id', isAuth, async (req, res) => {
    const member = await Member.findById(req.params.id);
    if(member) {
      const deletedMember = await member.remove();
      res.status(200).send({ msg: 'Member Reviews u fshi me sukses.', data: deletedMember });
    } else {
      res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
});


module.exports = router;