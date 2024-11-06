const userDao = require('../user/user.dao');
const keys = require('../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (user) => {
    const { email, password } = user;
    const getUser = await userDao.findUserByEmail(email);
    if (!getUser || !bcrypt.compareSync(password, getUser.password)) {
        return false;
    }else{
       return {token: jwt.sign({ email: getUser.email }, keys.jwtSecretKey, { expiresIn: '1h' })};
    }
};

exports.register = async (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    const registerUser = await userDao.createUser(user);
    return registerUser;
};