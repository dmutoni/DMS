const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');


Router.get("/getAllDonations", (req, res) => {
    dbConnection.query("SELECT * FROM dms_donations", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

// function checkLevelId(level_id, callBack) {
//     dbConnection.query("SELECT * FROM dms_levels WHERE level_id = ?", [level_id], function(err, rows, fields) {
//         if (rows.length > 0)
//             callBack(true)
//         else
//             callBack(false)

//     })
// }
function checkReportId(report_id, callBack) {
    dbConnection.query("SELECT * FROM dms_donations WHERE report_id = ?", [report_id], function(err, rows, fields) {
        if (rows.length > 0)
            callBack(true)
        else
            callBack(false)

    })
}


Router.post("/createNewDonation", function(req, res) {

    const validation = new Validator(req.body, {
        report_id: 'required',
        donation_amount_given: 'required',
        solved_by_level_id: 'required',
        done_on: 'required'
    });



    validation.check().then((matched) => {
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
                // console.log(checkLevelId('05cdfbfb-b415-4f34-b921-507df1a82e2c'));
                // let level_status = 1;
                // let failed_status = 0;
                // dbConnection.query("SELECT * FROM dms_levels WHERE level_id = ?", [inserts[2]], (err, rows, fields) => {
                //     console.log(rows);
                //     if (rows[0].level_id) {
                //         level_status;
                //     } else {
                //         failed_status;
                //     }
                // })





            checkReportId(inserts[2], function(isFound) {
                if (isFound) {
                    let sql = "INSERT INTO dms_donations(donation_id,report_id, donation_amount_given,solved_by_level_id,done_on) VALUES (?);";
                    dbConnection.query(sql, [inserts], (err, results, fields) => {

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

Router.put("/update/:id", (req, res) => {
    let donation_id = req.params['id'];
    donation_id.trim();
    const validation = new Validator(req.body, {
        report_id: 'required',
        donation_amount_given: 'required',
        solved_by_level_id: 'required',
        done_on: 'required'
    });
    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            checkReportId(inserts[3], function(isFound) {
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

                    dbConnection.query("UPDATE dms_donations SET ?  WHERE donation_id = ?", [inserts, donation_id], function(error, results, fields) {
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

Router.delete('/delete/:id', (req, res) => {
    let donation_id = req.params['id'];
    donation_id.trim();
    if (!donation_id) {
        return res.status(400).send({ error: true, message: 'Please provide a donation id' });
    }
    dbConnection.query('DELETE FROM dms_donations WHERE donation_id = ?', [donation_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'donation has been delete successfully.' });
    });
})

module.exports = Router;