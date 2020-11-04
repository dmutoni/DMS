const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
const asyncHandler = require('../middleware/async');


module.exports.getDonations = asyncHandler( async (req, res) => {
   await dbConnection.query("SELECT * FROM dms_donations", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

function checkReportId(report_id, callBack) {
    dbConnection.query("SELECT * FROM dms_donations WHERE report_id = ?", [report_id], function(err, rows, fields) {
        if (rows.length > 0)
            callBack(true)
        else
            callBack(false)

    })
}

 
module.exports.createDonation = asyncHandler(async(req, res) => { 

    const validation = new Validator(req.body, {
        report_id: 'required',
        donation_amount_given: 'required',
        solved_by_level_id: 'required',
        done_on: 'required'
    });



    validation.check().then(async(matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {

            let inserts = [
                    uuidv4(),
                    req.body.report_id,
                    req.body.donation_amount_given,
                    req.body.solved_by_level_id,
                    req.body.done_on
                ]
            checkReportId(inserts[2],async function(isFound) {
                if (isFound) {
                    let sql = "INSERT INTO dms_donations(donation_id,report_id, donation_amount_given,solved_by_level_id,done_on) VALUES (?);";
                  await  dbConnection.query(sql, [inserts], (err, results, fields) => {

                        if (err) {

                            res.status(401).send({ error: err.sqlMessage })
                                // throw err;
                        } else {
                            console.log(results)
                                // results.send("row inserted");
                            return res.send({ error: false, data: results, message: 'New donation has been created successfully.' });
                            // console.log("Row inserted: "+ results.affectedRows);
                        }
                    });
                } else {
                    res.status(404).send({ message: "Data not found" })
                        // console.log('Data not found');
                }
            });


        }

    })
})

module.exports.updateDonation= asyncHandler(async (req, res) => {
    let donation_id = req.params['id'];
    donation_id.trim();
    const validation = new Validator(req.body, {
        report_id: 'required',
        donation_amount_given: 'required',
        solved_by_level_id: 'required',
        done_on: 'required'
    });
    validation.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            checkReportId(inserts[3], async function(isFound) {
                if (isFound) {
                    // console.log(donation);
                    let inserts = {
                        donation_id: req.params.id,
                        report_id: req.body.report_id,
                        donation_amount_given: req.body.donation_amount_given,
                        solved_by_level_id: req.body.solved_by_level_id,
                        done_on: req.body.done_on
                    }

                    console.log(inserts);
                    if (!donation_id || !inserts) {
                        return res.status(400).send({ error: donation, message: 'Please provide donation and donation id' });
                    }

                  await dbConnection.query("UPDATE dms_donations SET ?  WHERE donation_id = ?", [inserts, donation_id], function(error, results, fields) {
                        if (error) throw error;
                        else {
                            return res.send({ error: false, data: results, message: 'donation has been updated successfully.' });
                        }
                    })
                }
            })
        }
    })
})

module.exports.deleteDonation = asyncHandler(async (req, res) => {
    let donation_id = req.params['id'];
    donation_id.trim();
    if (!donation_id) {
        return res.status(400).send({ error: true, message: 'Please provide a donation id' });
    }
   await dbConnection.query('DELETE FROM dms_donations WHERE donation_id = ?', [donation_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'donation has been delete successfully.' });
    });
})