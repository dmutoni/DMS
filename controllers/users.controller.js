const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
// let  payloadChecker = require('payload-validator');

Router.get("/getAllUsers", (req, res) => {
        console.log("reached WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        dbConnection.query("SELECT * FROM dms_users", (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        })
    })
    // const generateId = () => uuidv4()
Router.post("/createNewUser", (req, res) => {
    console.log("amadeni");

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
        address: 'required',
        user_type: 'required'
    });

    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {

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
                req.body.address,
                req.body.user_type,
                req.body.user_status
            ]
            let sql = "INSERT INTO dms_users(user_id,first_name,last_name,gender,email,phone_number,national_id,password,job_title,address,user_type,user_status) VALUES (?);";
            dbConnection.query(sql, [inserts], (err, results, fields) => {
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
Router.put("/updateUser/:user_id", function(req, res) {
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
        password: 'required',
        job_title: 'required',
        address: 'required',
        user_type: 'required'
    });
    validation.check().then((matched) => {
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
                password: req.body.password,
                job_title: req.body.job_title,
                address: req.body.address,
                user_type: req.body.user_type,
                user_status: req.body.user_status
            }
            console.log(inserts);
            if (!user_id || !inserts) {
                return res.status(400).send({ error: user, message: 'Please provide user and user id' });
            }
            let printQuery = dbConnection.query("UPDATE dms_users SET ? where user_id  = ?", [inserts, user_id], function(error, results, fields) {
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
Router.put('/delete/:id', (req, res) => {
    let user_id = req.params['id'];
    let status = "INACTIVe"
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide a user id' });
    }
    dbConnection.query("UPDATE dms_users SET user_status = ?  WHERE user_id = ?", [status, user_id], function(error, results, fields) {
        if (error) throw error;
        else {
            console.log(results)
                // results.send("row inserted");
            return res.status(201).send({ error: false, data: results, message: 'user has been delete successfully.' });
            // console.l
        }
    });
})

module.exports = Router;