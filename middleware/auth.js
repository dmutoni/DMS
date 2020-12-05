const jwt = require('jsonwebtoken')

// const {Category} = require('../models/User/UserCategory/user-category.model');

exports.AUTH_MIDDLEWARE = async (req, res, next) => {
    const header = req.header('Authorization');
     if (!header || !(header.startsWith('Bearer ')))
        return res.send('No Token Found').status(401);
    const token = header.split(' ')[1];
    if(!token)  return res.send('No Token Found').status(401)
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.category = await getCategory(decoded.category);
        next();
    }
    catch(err){
           res.send('Invalid Token').status(400)
    }
}

// const getCategory = async (id) => {
//     const category = await Category.findById(id);
//     return category.category;
// }

// let a = 8;
// console.log(a) 