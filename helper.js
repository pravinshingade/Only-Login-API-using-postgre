const bcrypt = require('bcrypt');
const jwt = ('jsonwebtoken');

const Helper = {
 
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
 
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(email) {
    const token = jwt.sign({
      email:email
    },
      'secretkey', { expiresIn: '7d' }
    );
    return token;
  }
}

module.exports = Helper;
