const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashString = async (str) => {
    return bcrypt.hash(str,12);
};

const compareHash = async (str, hash) => {
    return bcrypt.compare(str,hash);
};

module.exports = {
    hashString,
    compareHash,
};