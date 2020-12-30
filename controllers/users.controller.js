const app = require('express');
const { v4: uuidv4 } = require('uuid');

const _ = require('lodash')
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
const asyncHandler = require('../middleware/async');
// let  payloadChecker = require('payload-validator');

module.exports.getUsers = asyncHandler(async (req, res) => {
    try {
        await dbConnection.query("SELECT * FROM dms_users", (err, rows, fields) => {
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
module.exports.getUserById = asyncHandler(async (req, res) => {
    let user_id = req.params['id'];
    user_id.trim();

    dbConnection.query("SELECT * FROM dms_users WHERE user_id = ?",
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
            // const password = hashPassword(req.body.password);
            let inserts = [
                uuidv4(),
                req.body.first_name,
                req.body.last_name,
                req.body.gender,
                req.body.email,
                req.body.phone_number,
                req.body.national_id,
                req.body.password,
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
    let user_id = req.params['user_id'];
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
    let printQuery = await dbConnection.query("UPDATE dms_users SET ? where user_id  = ?", [inserts, user_id], function (error, results, fields) {
        if (error) {

            res.status(401).send({ error: error.sqlMessage })
            throw err;
        } else {
            console.log(results);
            console.log("reached") // results.send("row inserted");
            return res.status(201).send({ error: false, data: results, message: 'user has been updated successfully.' });
            // console.log("Row inserted: "+ results.affectedRows);
        };
    })
}

module.exports.createLevelSignature = async(req,res) => {
    let user_category;
    if (!req.params) {
        return res.status(400).send({ success: false, data: "no provided id" })
    }
    let user_id = req.params['user_id'];
    user_id.trim();

    dbConnection.query("SELECT user_type FROM dms_users WHERE user_id = ?",
    [user_id], function (err, rowsFound, fields) {
        if (!err) {
            user_category = rowsFound;
            console.log(user_category)
            return res.send({ success: true, data: user_category });
        } else {
            return res.send({ success: false, data: err })
        }
    })

    // if (_.isEmpty(req.file)) {
    //     return res.status(400).send({ success: false, data: "can not insert empty file" })
    // };

    // let inserts = {
    //     user_signature: req.file.filename
    // }
    // let printQuery = await dbConnection.query("UPDATE dms_users SET ? where user_id  = ?", [inserts, user_id], function (error, results, fields) {
    //     if (error) {

    //         res.status(401).send({ error: error.sqlMessage })
    //         throw err;
    //     } else {
    //         console.log(results);
    //         return res.status(201).send({ error: false, data: results, message: 'user has been updated successfully.' });
    //     };
    // })
}