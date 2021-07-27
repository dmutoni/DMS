const jwt = require('jsonwebtoken');

exports.generateAuthToken = function (user_id, userUniqueness) {
    return jwt.sign({id: user_id, userUniqueness: userUniqueness}, process.env.TOKEN_SECRET,{expiresIn: '1h'})
}