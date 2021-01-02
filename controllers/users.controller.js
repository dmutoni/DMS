const app = require('express');
const { v4: uuidv4 } = require('uuid');
const { deleteFile } = require('../functions/deleteFile')
const _ = require('lodash')
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
const asyncHandler = require('../middleware/async');
const {hashPassword} = require('../utils/passwords/hash')
const bcrypt = require('bcryptjs')
const {generateAuthToken} = require('../utils/tokens/generateToken')
// let  payloadChecker = require('payload-validator');

module.exports.getUsers = asyncHandler(async (req, res) => {
    try {
        await dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id)  JOIN dms_provinces ON (dms_provinces.province_id=dms_districts.province_id)", (err, rows, fields) => {
            if (!err) {
                return res.status(200).send({ success: true, data: rows });
            } else {
                return res.status(400).send({ success: false, data: err })
            }
        })
    } catch (error) {
        return res.status(500).send({ error: "internal server error" })
    }

})

// let userFoundResults;
// let userFoundResultsError;
getUserByIdFunction = (id) => {
    dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id)  JOIN dms_provinces ON (dms_provinces.province_id=dms_districts.province_id)  WHERE user_id = ?",
        [id], function (err, rowsFound, fields) {
            if (!err) { 
               return rowsFound;
                // console.log(userFoundResults)
            } else {
               return err;
            }
        })
}

module.exports.getUserById = asyncHandler(async (req, res) => {
    let user_id = req.params['id'];
    user_id.trim();
    dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id)  JOIN dms_provinces ON (dms_provinces.province_id=dms_districts.province_id)  WHERE user_id = ?",
    [user_id], function (err, rowsFound, fields) {
        if (!err) {
            return res.send({ success: true, data: rowsFound });
        } else {
            return res.send({ success: false, data: err })
        }
    })
})
// const generateId = () => uuidv4()
module.exports.createUser = asyncHandler(async (req, res) => {

    const validation = new Validator(req.body, {
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        email: 'required|email',
        age: 'required|integer|minLength:1',
        phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        password: 'required',
        job_title: 'required',
        sector_id: 'required',
        user_type: 'required'
    });

    validation.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            const hashedPassword = await hashPassword(req.body.password);
            console.log("password ",hashedPassword)
            let inserts = [
                uuidv4(),
                req.body.first_name,
                req.body.last_name,
                req.body.gender,
                req.body.email,
                req.body.phone_number,
                req.body.national_id,
                hashedPassword,
                req.body.job_title,
                req.body.sector_id,
                req.body.user_type,
                req.body.user_status
            ]
            let sql = "INSERT INTO dms_users(user_id,first_name,last_name,gender,email,phone_number,national_id,password,job_title,sector_id,user_type,user_status) VALUES (?);";
            await dbConnection.query(sql, [inserts], (err, results, fields) => {
                if (err) {

                    res.status(401).send({ error: err.sqlMessage })
                    // throw err;
                } else {
                    console.log(results)
                    // results.send("row inserted");
                    return res.status(201).send({ error: false, data: results, message: 'New user has been created successfully.' });
                    // console.log("Row inserted: "+ results.affectedRows);
                }
            });
        }

    })
})
module.exports.updateUser = asyncHandler(async (req, res) => {
    let user_id = req.params['id'];
    console.log(user_id)

    user_id.trim();
    // let ii_id = req.params.iid;
    const validation = new Validator(req.body, {
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        email: 'required|email',
        age: 'required|integer|minLength:1',
        phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        job_title: 'required',
        sector_id: 'required',
        user_type: 'required'
    });
    validation.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            // console.log(user);
            let inserts = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                email: req.body.email,
                phone_number: req.body.phone_number,
                national_id: req.body.national_id,
                job_title: req.body.job_title,
                sector_id: req.body.sector_id,
                user_type: req.body.user_type,
                user_status: req.body.user_status
            }
            console.log(inserts);
            if (!user_id || !inserts) {
                return res.status(400).send({ error: user, message: 'Please provide user and user id' });
            }
            let printQuery = await dbConnection.query("UPDATE dms_users SET ? where user_id  = ?", [inserts, user_id], function (error, results, fields) {
                if (error) {

                    res.status(401).send({ error: error.sqlMessage })
                    // throw err;
                } else {
                    console.log(results);
                    console.log("reached") // results.send("row inserted");
                    return res.status(201).send({ error: false, data: results, message: 'user has been updated successfully.' });
                    // console.log("Row inserted: "+ results.affectedRows);
                };
            })
            console.log(printQuery);
        }
    });
});
module.exports.deleteUser = asyncHandler(async (req, res) => {
    let user_id = req.params['id'];
    let status = "INACTIVe"
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide a user id' });
    }
    await dbConnection.query("UPDATE dms_users SET user_status = ?  WHERE user_id = ?", [status, user_id], function (error, results, fields) {
        if (error) throw error;
        else {
            console.log(results)
            // results.send("row inserted");
            return res.status(201).send({ error: false, data: results, message: 'user has been delete successfully.' });
            // console.l
        }
    });
})

const readFiles = (req, res) => {
    if (_.isEmpty(req.file)) {
        return res.status(400).send({ success: false, data: "can not insert empty file" })
    };

    let inserts = {
        level_stamp: req.file.filename
    }
    return inserts;
}

module.exports.createUSerSignature = async (req, res) => {
    console.log("something")
    if (!req.params) {
        return res.status(400).send({ success: false, data: "no provided id" })
    }
    let user_id = req.params['user_id'];
    user_id.trim();
    // let ii_id = req.params.iid;

    if (_.isEmpty(req.file)) {
        return res.status(400).send({ success: false, data: "can not insert empty file" })
    };

    let inserts = {
        user_signature: req.file.filename
    }
    // console.log()
    await dbConnection.query("UPDATE dms_users SET ? where user_id  = ?", [inserts, user_id], function (error, results, fields) {
        if (error) {
            // deleteFile()
            res.status(401).send({ error: error.sqlMessage })
            throw err;
        } else {
            console.log(results);
            return res.status(201).send({ error: false, data: results, message: 'user has been updated successfully.' });
        };
    })
}

let userWithSameCategory = [];

const updateNationalUsers = (req,res) => {
    dbConnection.query("UPDATE dms_users SET ? where user_type = 'NATIONAL' ", [readFiles(req, res)], function (error, results, fields) {
        if (error) {
            // fs.unlink('images' + req.file.filename, () => {
            //     return res.status(404).send({ message: "error occurred" })
            // })
            deleteFile(req.file.filename)
            return res.status(500).send({success: false, message: "error occurred"});
            // res.status(401).send({ error: error.sqlMessage })
            throw error;
        } else {
            console.log(results);
            return res.status(201).send({ error: false, data: results, message: 'user has been updated successfully.' });
        };
    })
}
// this is a function for updating all the users who has the same district id as the user who has been selected 

const updateUsersWithTheSameId = (req, res, index) => {

    dbConnection.query("UPDATE dms_users SET ? where user_id = ? ", [readFiles(req, res), index], function (error, results, fields) {
        if (error) {
            // fs.unlink('images' + req.file.filename, () => {
            //     return res.status(404).send({ message: "error occurred" })
            // })
            deleteFile(req.file.filename)
            // return res.status(500).send({message: "error occurred"});
            // res.status(401).send({ error: error.sqlMessage })
            throw error;
        } else {
            console.log(results);
            // return res.status(201).send({ error: false, data: results, message: 'user has been updated successfully.' });
        };
    })
}


// this is a function of selecting all the users who has the same district id with the user

const checkUsers = (district_id, req, res) => {
    dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) WHERE dms_sectors.district_id = ? AND dms_users.user_type = 'DISTRICT'",
        [district_id], function (err, rowsFound, fields) {
            if (!err) {
                userWithSameCategory = rowsFound
                console.log("reached")
                let fileOfTheUser
                for (let index = 0; index < userWithSameCategory.length; index++) {
                    const element = userWithSameCategory[index].user_id;
                    if(userWithSameCategory[index].level_stamp){
                         fileOfTheUser = userWithSameCategory[index].level_stamp;
                    }
                    updateUsersWithTheSameId(req, res, element)
                }
                console.log(`file of the user ${fileOfTheUser}`)
                deleteFile(fileOfTheUser)
                return res.status(200).send({ success: true, data: rowsFound });
            } else {
                // return res.status(400).send({ success: false, data: err })
            }
        })
}

// this is a function for selecting district id for the user who has logged in 

module.exports.createLevelSignature = async (req, res) => {
    if (!req.params) {
        return res.status(400).send({ success: false, data: "no provided id" })
    }
    let user_id = req.params['user_id'];
    user_id.trim();
    await dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id)  JOIN dms_provinces ON (dms_provinces.province_id=dms_districts.province_id) WHERE user_id = ?",
        [user_id], function (err, rowsFound, fields) {
            if (!err) {
                const user_type = rowsFound[0].user_type;
                user_district_id = rowsFound[0].district_id;
                console.log("district id: ", user_district_id)
                if(user_type === "DISTRICT") {
                    checkUsers(user_district_id, req, res)
                } else if(user_type === "NATIONAL"){
                    console.log("user type is national");
                    updateNationalUsers(req,res)
                }
                else {
                    return res.status(400).send({success: false,message: "bad request"});
                }
            } else {
                return err;
            }
        })
}
exports.login = async(req,res) => {
    let user_id = req.params['id'];
    user_id.trim();

    dbConnection.query("SELECT * FROM dms_users JOIN dms_sectors ON (dms_sectors.sector_id = dms_users.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id)  JOIN dms_provinces ON (dms_provinces.province_id=dms_districts.province_id)  WHERE user_id = ?",
    [user_id],  async(err, rowsFound, fields) => {
        if (!err) {
            if(!rowsFound.length > 0) return res.status(400).send({ success: false, data: "nothing found" });
            const userId = rowsFound[0].user_id;
            const matchedPassword = await bcrypt.compare(req.body.password,rowsFound[0].password);
            if(!matchedPassword)  return res.status(400).send({success: false, data: "invalid email or password"})

            return res.status(200).send({success: true,data: rowsFound, token: generateAuthToken(userId)})
        } else {
            return res.send({ success: false, data: err })
        }
    })
} 