const express = require('express');
const User = require('../models/user');
const { getToken, isAuth } = require('../util');
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eshopsuport7@gmail.com',
      pass: 'eshop123',
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.get('/', isAuth, async (req, res) => {
    const users = await User.find({});  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
    res.send(users);
})

router.post('/signin', async (req, res) => {
    try {
        //findByCredentials() -e kemi kriju tek modeli User(e kemi bo stattike qe me thirr ktu direkt)
        const user = await User.findByCredentials(
          req.body.email,
          req.body.password
        );
       
        res.send({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: getToken(user)
        })
      } catch (error) {
        if (error) {
          return res.status(400).json({ error: error.message }); //error.message - e marrim errorin qe e qet tek User.js e kom bo throw new() nese ka naj error tek metoda findByCredentials, kurse error: me kete i qasemi atje n front pra error: bon me lan qfare do
        }
    }
})

router.post('/register', async (req, res) => { 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    try {
        await user.save();
        const url = `http://localhost:5000/api/users/confirmation/${user._id}`;

        transporter.sendMail({
            from: 'eshopsuport7@gmail.com',
            to: req.body.email,
            subject: 'Konfirmo Emailin',
            html: `<h3>Përshëndetje ${req.body.name}</h3><p style="Margin: 0;
                    font-size: 14px;
                    font-family: raleway,sans-serif;
                    line-height: 21px;
                    color: #333333;
                ">Faleminderit për regjistrimin.Kliko në linkun për të konfirumar email adresën (${req.body.email}) <a href="${url}" style="border-color: #2cb543;
                    background: #4f7af0;
                    border-width: 0px;
                    display: inline-block;
                    border-radius: 5px;
                    width: auto;
                    padding: 10px;
                    color: #fff;
                    cursor: pointer;
                    text-decoration: none;">KONFIRMO EMAILIN</a>
                </p>
            `
        });

        res.send({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: getToken(user)
        })
    } catch (error) {
        if (error) {
            return res.status(400).json({
              title: "error",
              error: "Email-i ekziston.Provo një tjetër.", //atje ne fron i qasna response.data.error - error sepse ktu e kom lan emrin error: 'Email is taken..!
            });
        }
    }
})

router.get('/confirmation/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId});
        await user.updateOne({"$set": {'confirmed': true }})
    } catch (e) {
      res.send('error');
    }
  
    return res.redirect('http://localhost:3000/login'); //pasi e klikoj linkun n email vjen ktu, e bon update userin edhe m dergon tek login n react anej.
});

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        const updateduser = await user.save();

        if(updateduser) {
            return res.status(200).send({ msg: 'User Updated.', data: updateduser });
        } else {
            return res.status(500).send({ msg: 'Error in Updating User.' })
        }
    }
});

router.post('/createAdmin', isAuth, async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
            // isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    } catch(error) {
        res.send({ msg: error.message })
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
      const deletedUser = await user.remove();
      res.status(200).send({ msg: 'Përdoruesi u fshi me sukses.', data: deletedUser });
    } else {
      res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
});

module.exports = router;