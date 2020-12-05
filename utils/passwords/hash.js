const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed;
}
