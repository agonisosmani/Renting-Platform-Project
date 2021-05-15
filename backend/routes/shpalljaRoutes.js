const express = require('express');
const multer = require('multer');
const Shpallja = require('../models/shpallja');
const { isAuth } = require('../util');
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


router.get('/mine', isAuth, async (req, res) => {
  const shpalljet = await Shpallja.find({ user: req.user._id }) //pra me i gjet t orders t atij useri i cili eshte i logum.
  res.send(shpalljet);
});

router.get('/all', isAuth, async (req, res) => {
  const shpalljet = await Shpallja.find({}).sort( { _id: -1 } );  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
  res.send(shpalljet);
})

router.get('/', async (req, res) => {
    // per me bo search me shkronj t madhe ose me shkronj t vogel psh makina, Makina me qen njesoje(e kemi shtu kta $regex dhe option ->mongodb e ofron)
    const category = req.query.category ? { category: { $regex: req.query.category, $options: 'i' }} : {};
    const komuna = req.query.komuna ? { komuna: { $regex: req.query.komuna, $options: 'i' }} : {};
   
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const shpalljet = await Shpallja.find({ ...category, ...komuna }).sort(
        sortOrder
      );
    if(shpalljet.length < 1) {
      res.send({ categoryNotFound: true, shpalljet: shpalljet }) //sepse nese shkrujm naj sen palidhje ne search aty tek shpalljet psh psh kastriot, kastriot skemi kategory ne db, ather me lajmru userin qe ska asi kategorie
    
    } else {
      res.send({ categoryNotFound: false, shpalljet: shpalljet }); //ketu dmth qe ekziston produkti me qat kategori psh makina , makina ekzistton ne db
    
    }
    
});

//duhet me kriju un folderin images ne backend folderin ndryshe nuk bon.

const DIR = './images/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/', isAuth, upload.array('images', 6), async (req, res) => {
    const reqFiles = [];
    const rating = []; //kjo eshte per rating, kur dikush e vlerson nje shpallje
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/images/' + req.files[i].filename)
    }

    const shpallja = new Shpallja({
        user: req.user._id,
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        category: req.body.category,
        komuna: req.body.komuna,
        title: req.body.title,
        description: req.body.description,
        images: reqFiles,
        // rating: { $push: {"rating": req.body.rating} },
        price: req.body.price,
    });
    const newShpallja = await shpallja.save();
    if(newShpallja) {
        res.send({
            _id: newShpallja.id,
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.telephone,
            title: req.body.title,
            success: true //kete m vyn per me shfaq postimi u shfaq me sukses masi te boj submit formen prandaj e shtova success: true
        })
    } else {
        res.status(401).send({ msg: 'Something went wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    Shpallja.findById(id, (err, data) => {
        if(err) return res.json({message: 'Shallja nuk ekziston.'});
        res.send(data);
    });
});

router.put('/:id', isAuth, async (req, res) => {
    const shpallja = await Shpallja.findOne({ _id: req.params.id });
    if(shpallja) {
      //KJO METOD NA VYN SEPSE KUR E KLIKOJ ATJE butonin approved tek lista-shpalljeve-> athere kjo e ndrron kete isApproved prej false ne true(false eshte by default kur t krijohet shpallja.)
  
      const updatedShpallja = await shpallja.updateOne({"$set": {'isApproved': true }})
        transporter.sendMail({
          from: 'eshopsuport7@gmail.com',
          to: shpallja.email,
          subject: 'Njoftim Rreth Shpalljes',
          html: `Përshëndetje ${shpallja.name} ju njoftojm se shpallja juaj eshte aprouvar dhe është postuar në aplikacion.`,
      });
  
      if(updatedShpallja) {
        return res.status(200).send({ msg: 'Shpallja u editua', data: updatedShpallja });
      } else {
        return res.status(500).send({ msg: 'Error në editimin e shpalljes.' })
      }
    }
});

//kjo metod na vyn per me bo update shpalljen, kur useri e vlerson(rating) shpalljen
router.put('/rating/:id', async (req, res) => {
  const shpalljaId = req.params.id;
  const shpallja = await Shpallja.findById(shpalljaId);

  if(shpallja) {
      //$push sepse mduhet me bo push n array, sa her qe dikush bon rating
      const updatedShpallja = await shpallja.updateOne({ $push: {"rating": req.body.rating} });
      console.log(updatedShpallja);
      if(updatedShpallja) {
          return res.status(200).send({ msg: 'Shpallja Updated.', data: updatedShpallja });
      } else {
          return res.status(500).send({ msg: 'Error in Updating Shpalljen.' })
      }
  }
});

router.delete('/:id', isAuth, async (req, res) => {
    const shpallja = await Shpallja.findById(req.params.id);
    if(shpallja) {
      const deletedShpallja = await shpallja.remove();
      res.status(200).send({ msg: 'Shpallja u fshi me sukses.', data: deletedShpallja });
    } else {
      res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
});

module.exports = router;