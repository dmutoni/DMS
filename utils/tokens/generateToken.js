const jwt = require('jsonwebtoken');

exports.generateAuthToken = function (user_id) {
    console.log(process.env.TOKEN_SECRET)
    return jwt.sign({id: user_id}, process.env.TOKEN_SECRET,{expiresIn: '1h'})
}