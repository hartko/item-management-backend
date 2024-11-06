const User = require('../models/user.model');

exports.createUser = async (user) => {
    const result = await User(user).save();
    return result;
}

exports.findUserByEmail = async (email) => {
    const result = await User.findOne({email})
    return result;
}
