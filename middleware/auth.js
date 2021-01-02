const jwt = require('jsonwebtoken');
const dbConnection = require('../config/db.config');

exports.protect = async (req,res,next) => {
    try {
        
    let token;
    if(
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(res.status(401).send({message: "Not authorized to access this route"}))
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id)  JOIN dms_provinces ON (dms_provinces.province_id=dms_districts.province_id)  WHERE user_id = ?",
        [decoded.id], function (err, rowsFound, fields) {
            if (!err) {
                req.user = rowsFound
                // const userType = await UserTypes.findById(req.user.user_type_id)
                req.user.role = rowsFound[0].user_type
                // return res.send({ success: true, data: rowsFound });
                next()
            } else {
                return res.send({ success: false, data: err })
            }
        })
        console.log("something ",decoded)
       

        
    } catch (err){
        console.log(err)
        return next(res.status(401).send({message: "Not authorized to access this route"}))
    }
} catch {
    return next(res.status(400).send({message: "Invalid token"}))
}
}

exports.authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(
                res.status(403).send(`User role ${req.user.role} is not authorized to access this route`)
            )
        }
        next()
    }
}