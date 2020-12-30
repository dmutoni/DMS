const multer = require('multer');

let storage  = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log("fg"+req.dir)
        cb(null, req.dir)
    },
    filename: (req,file,cb) => {
        console.log(file);
        cb(null,file.originalname )
    }
})

exports.upload = multer({ storage: storage })