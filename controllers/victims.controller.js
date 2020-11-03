const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
// let  payloadChecker = require('payload-validator');

Router.get("/getAllVictims", (req, res) => {
    dbConnection.query("SELECT * FROM dms_victims", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})
const generateId = () => uuidv4()
Router.post("/createNewVictim", function(req, res) {

    const validation = new Validator(req.body, {
        victim_pin: 'required',
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        age: 'required|integer|minLength:1',
        marital_status: 'required',
        family_members: 'required|integer',
        primary_phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        is_employed: 'required',
        ikiciro_ubudehe: 'required',
        isibo: 'required',
        village_id: 'required'
    });



    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {

            let inserts = [
                uuidv4(),
                req.body.victim_pin,
                req.body.first_name,
                req.body.last_name,
                req.body.gender,
                req.body.age,
                req.body.marital_status,
                req.body.family_members,
                req.body.primary_phone_number,
                req.body.secondary_phone_number,
                req.body.national_id,
                req.body.is_employed.toLowerCase() == 'true' ? 1 : 0,
                req.body.ikiciro_ubudehe,
                req.body.isibo,
                req.body.village_id
            ]
            let sql = "INSERT INTO dms_victims(victim_id,victim_pin, first_name, last_name, gender, age, marital_status,family_members, primary_phone_number, secondary_phone_number, national_id, is_employed, ikiciro_ubudehe, isibo, village_id) VALUES (?);";
            dbConnection.query(sql, [inserts], (err, results, fields) => {
                if (err) {

                    res.status(401).send({ error: err.sqlMessage })
                        // throw err;
                } else {
                    console.log(results)
                        // results.send("row inserted");
                    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
                    // console.log("Row inserted: "+ results.affectedRows);
                }
            });
        }

    })
})
Router.put("/update/:id", (req, res) => {
    let victim_id = req.params['id'];
    victim_id.trim();
    const validation = new Validator(req.body, {
        victim_pin: 'required',
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        age: 'required|integer|minLength:1',
        marital_status: 'required',
        family_members: 'required|integer',
        primary_phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        is_employed: 'required',
        ikiciro_ubudehe: 'required',
        isibo: 'required',
        village_id: 'required'
    });
    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            // console.log(victim);
            let inserts = {
                victim_id: req.params.id,
                victim_pin: req.body.victim_pin,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                age: req.body.age,
                marital_status: req.body.marital_status,
                family_members: req.body.family_members,
                primary_phone_number: req.body.primary_phone_number,
                secondary_phone_number: req.body.secondary_phone_number,
                national_id: req.body.national_id,
                is_employed: req.body.is_employed.toLowerCase() == 'true' ? 1 : 0,
                ikiciro_ubudehe: req.body.ikiciro_ubudehe,
                isibo: req.body.isibo,
                village_id: req.body.village_id
            }

            console.log(inserts);
            if (!victim_id || !inserts) {
                return res.status(400).send({ error: victim, message: 'Please provide victim and victim id' });
            }
            dbConnection.query("UPDATE dms_victims SET ?  WHERE victim_id = ?", [inserts, victim_id], function(error, results, fields) {
                if (error) throw error;
                return res.send({ error: false, data: results, message: 'victim has been updated successfully.' });
            })
        }
    });
});
Router.delete('/delete/:id', (req, res) => {
    let victim_id = req.params['id'];
    victim_id.trim();
    if (!victim_id) {
        return res.status(400).send({ error: true, message: 'Please provide a user id' });
    }
    dbConnection.query('DELETE FROM dms_victims WHERE victim_id = ?', [victim_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been delete successfully.' });
    });
})

module.exports = Router;