const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      dropDups: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email: email });
  
    if (!user) {
      throw new Error("Email-i nuk ekziston!");
    }

    if (!user.confirmed) {
      throw new Error('Konfirmo emaili-in për të u loguar.');
    }
  
    const isMatch = await bcrypt.compare(password, user.password); // e krahason passwordin qe e ka shkru useri me passwordin qe e ka useri ne databaz
  
    if (!isMatch) {
      throw new Error("Fjalëkalimi gabim!Provo përsëri.");
    }
  
    return user;
  };

userSchema.pre("save", async function(next) {
    // pra po dojm me bo diqka para se useri me u rujt ne databaz, po ja bojm hash passwordin
    const user = this; //tek useri i caktuar i cili po bohet save
  
    if (user.isModified("password")) {
      // eshte true kur useri krijohet per her t par, apo kur useri bohet update(qe ja kemi bo update passwordin pra)
      user.password = await bcrypt.hash(user.password, 8);
    }
  
    next(); // e thirrim kete metod kur t kryjm pun, pra e kemi bo hashpaswordin u kry puna, sepse ndryshe kjo metod thirret invinit sepse sdihet se kur u perfundu
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;