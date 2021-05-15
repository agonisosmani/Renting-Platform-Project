const jwt = require('jsonwebtoken');
const config = require('./config');

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization; //ketu rrin tokeni ne authorization t headerit
    if(token) {
        const onlyToken = token.slice(7, token.length); //per me marr veq pjesen e tokenit me fshi ata Bearer
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).send({ msg: 'Invalid token' })
            }
            req.user = decode;
            next(); 
            return
        });
    } else {
        return res.status(401).send({ msg: 'Token is not supplied.'});
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin Token is not valid.'})
}

module.exports = { getToken, isAuth, isAdmin };