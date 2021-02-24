const app = require('express');
const asyncHandler = require('../middleware/async');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
// let  payloadChecker = require('payload-validator');

// Router.get("/getAllVictims", (req, res) => {
//     dbConnection.query("SELECT * FROM dms_victims", (err, rows, fields) => {
//         if (!err) {
//             res.send(rows);
//         } else {
//             console.log(err);
//         }
//     })
// })

module.exports.getVictims = asyncHandler(async (req,res) => {
   await dbConnection.query("SELECT * FROM dms_victims", (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ success: true, data: rows });
        } else {
            console.log(err);
        }
    })
})

module.exports.getVictimById = asyncHandler(async(req,res) => {
    let victim_id = req.params['id'];
    victim_id.trim();
    
   dbConnection.query("SELECT * FROM dms_victims WHERE victim_id = ?",
    [victim_id],function (err, rowsFound, fields) {
        if (!err) {
          return res.send({success: true, data: rowsFound});
        } else {
           return res.send({success: false, data: err})
        }
    })
})

// const generateId = () => uuidv4() 
module.exports.createVictim = asyncHandler(async(req, res) => {

    const validation = new Validator(req.body, {
        // victim_pin: 'required',
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        marital_status: 'required',
        family_members: 'required|integer',
        primary_phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        is_employed: 'required',
        ikiciro_ubudehe: 'required',
        isibo: 'required',
        village_id: 'required'
    });



    validation.check().then(async(matched) => {
        if (!matched) {
            res.status(422).send({success: false,data: validation.errors});
        } else if (matched) {
         let victim_pin = req.body.village_id

            let inserts = [
                uuidv4(),
                victim_pin,
                req.body.first_name,
                req.body.last_name,
                req.body.gender,
                req.body.marital_status,
                req.body.family_members,
                req.body.primary_phone_number,
                req.body.secondary_phone_number,
                req.body.national_id,
                req.body.is_employed,
                req.body.ikiciro_ubudehe,
                req.body.isibo,
                req.body.village_id
            ]
            console.log("reaching");
            let sql = "INSERT INTO dms_victims(victim_id,victim_pin, first_name, last_name, gender, marital_status,family_members, primary_phone_number, secondary_phone_number, national_id, is_employed, ikiciro_ubudehe, isibo, village_id) VALUES (?);";
          await  dbConnection.query(sql, [inserts], (err, results, fields) => {
                if (err) {
                    res.status(401).send({ error: err.sqlMessage })
                        // throw err;
                } else {
                    let returnValues = {
                        victim_id : inserts[0],
                        victim_pin: inserts[1],
                        first_name: inserts[2],
                        last_name: inserts[3],
                        gender: inserts[4],
                        marital_status: inserts[5],
                        family_members: inserts[6],
                        primary_phone_number: inserts[7],
                        secondary_phone_number: inserts[8],
                        national_id: inserts[9],
                        is_employed: inserts[10],
                        ikiciro_ubudehe: inserts[11],
                        isibo: inserts[12],
                        village_id: inserts[13]
                    }
                        // results.send("row inserted");
                    return res.status(201).json({ success:true , data: returnValues, message: 'New user has been created successfully.' });
                    // console.log("Row inserted: "+ results.affectedRows);
                }
            });
        }

    })
})
module.exports.updateVictim = asyncHandler(async (req, res) => {
    let victim_id = req.params['id'];
    victim_id.trim();
    const validation = new Validator(req.body, {
        victim_pin: 'required',
        first_name: 'required',
        last_name: 'required',
        gender: 'required',
        marital_status: 'required',
        family_members: 'required|integer',
        primary_phone_number: 'required|integer|minLength:12|maxLength:12',
        national_id: 'required|integer|minLength:16|maxLength:16',
        is_employed: 'required',
        ikiciro_ubudehe: 'required',
        isibo: 'required',
        village_id: 'required'
    });
    validation.check().then(async (matched) => {
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
                marital_status: req.body.marital_status,
                family_members: req.body.family_members,
                primary_phone_number: req.body.primary_phone_number,
                secondary_phone_number: req.body.secondary_phone_number,
                national_id: req.body.national_id,
                is_employed: req.body.is_employed,
                ikiciro_ubudehe: req.body.ikiciro_ubudehe,
                isibo: req.body.isibo,
                village_id: req.body.village_id
            }

            console.log(inserts);
            if (!victim_id || !inserts) {
                return res.status(400).send({ error: victim, message: 'Please provide victim and victim id' });
            }
           await dbConnection.query("UPDATE dms_victims SET ?  WHERE victim_id = ?", [inserts, victim_id], function(error, results, fields) {
                if (error) throw error;
                return res.send({ error: false, data: results, message: 'victim has been updated successfully.' });
            })
        }
    });
});
module.exports.deleteVictim = asyncHandler(async (req, res) => {
    let victim_id = req.params['id'];
    victim_id.trim();
    if (!victim_id) {
        return res.status(400).send({ error: true, message: 'Please provide a user id' });
    }
    await dbConnection.query('DELETE FROM dms_victims WHERE victim_id = ?', [victim_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'victim has been delete successfully.' });
    });
})

// module.exports = Router;
