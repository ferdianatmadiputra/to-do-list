const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

function hashPassword(password){
    console.log('masuk hash')
    return bcrypt.hashSync(password, salt);
}

function compare(plaintext, hash){
    return bcrypt.compareSync(plaintext, hash);
}

module.exports = { hashPassword, compare }