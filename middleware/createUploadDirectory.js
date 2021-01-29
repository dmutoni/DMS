const fs = require('fs');
// const {Category} = require('../models/User/UserCategory/user-category.model');

exports.CREATE_DIR = (path) => {
    console.log(path)
    return async (req, res, next) => {
        try {
            const dir = `uploads/${path}`
            req.dir = dir;
            fs.exists(dir, (exists) => {
                if (!exists) {
                    fs.mkdir(dir, { recursive: true }, (err) => {
                        
                        next();
                    })
                }
                else next();
            })
        }
        catch (err) {
            res.send('error occurred').status(500)
        }
    }
}

// const getCategory = async (id) => {
//     const category = await Category.findById(id);
//     return category.category;
// }

// let a = 8;
// console.log(a) 