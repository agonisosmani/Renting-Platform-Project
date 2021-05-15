const express = require('express');
const multer = require('multer');
const Category = require('../models/category');
const { isAuth } = require('../util');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const categories = await Category.find({});  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
//     res.send(categories);
// });

router.get('/', async (req, res, next) => {
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);// Make sure to parse the skip to number
 
    const categories = await Category.find({}).skip(skip).limit(limit); //limit i bjen page size mdoket.
    res.send(categories);
});

//kjo metod na vyn per category slider aty n home page me dit per butonat next-page kur me qit kur jo.
router.get('/categoriesNumber', async (req, res) => {
    const categories = await Category.find({});  //per me naj sortu prej fundit pra ato qe insertohen t fundit me dal t parat ne front aneej ne front.
    res.send({'CategoryLength': categories.length});
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

router.post('/', isAuth, upload.array('images', 2), async (req, res) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/images/' + req.files[i].filename)
    }
    const category = new Category({
        name: req.body.name,
        images: reqFiles,
        rating: req.body.rating
    });
    const newCategory = await category.save();

    if(newCategory) {
        res.send({
            _id: newCategory.id,
            name: req.body.name,
            success: true //kete m vyn per me shfaq postimi u shfaq me sukses masi te boj submit formen prandaj e shtova success: true
        })
    } else {
        res.status(401).send({ msg: 'Something went wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, data) => {
        if(err) return res.json({message: 'Kategoria nuk ekziston.'});
        res.send(data);
    });
});

router.delete('/:id', isAuth, async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(category) {
      const deletedCategory = await category.remove();
      res.status(200).send({ msg: 'Kategoria u fshi me sukses.', data: deletedCategory });
    } else {
      res.status(500).send({ msg: 'Something went wrong.Try again.' })
    }
});

module.exports = router;