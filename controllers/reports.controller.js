const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
const asyncHandler = require('../middleware/async');


module.exports.getReports = asyncHandler (async(req, res) => {
    dbConnection.query("SELECT * FROM dms_reports", (err, rows, fields) => {
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
async function checkReportId(victim_id, high_risk_zone_id, callBack) {
    let foundFulFilled = 0;
    try {
        let done = await dbConnection.query("SELECT * FROM dms_victims WHERE victim_id = ?", victim_id)

        console.log(done);
        if (done.length > 0) {
            foundFulFilled = 1

        }
    } catch (err) {


    }
    console.log(foundFulFilled)

    dbConnection.query("SELECT * FROM dms_high_risk_zones WHERE h_zone_id = ?", [high_risk_zone_id], function(err, rows, fields) {
        if (rows.length > 0)
            foundFulFilled = true
    })

    if (foundFulFilled === false) {
        return callBack(false)
    }
    callBack(true)
}

 
module.exports.createReport = asyncHandler(async (req, res) => {

    const validation = new Validator(req.body, {
        victim_id: 'required',
        report_category: 'required',
        report_description: 'required',

    });



    validation.check().then(async(matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {

            let inserts = [
                uuidv4(),
                req.body.victim_id,
                req.body.report_category,
                req.body.report_description,
                req.body.high_zone_area_if_available_id
            ]
            console.log(inserts[1]);
            console.log(inserts[4])
            checkReportId(inserts[1], inserts[4], async function(isFound) {
                if (isFound) {
                    let sql = "INSERT INTO dms_reports(report_id,victim_id,report_category,report_description,high_zone_area_if_available_id) VALUES (?);";
                await    dbConnection.query(sql, [inserts], (err, results, fields) => {

                        if (err) {

                            res.status(401).send({ error: err.sqlMessage })
                                // throw err;
                        } else {
                            console.log(results)
                                // results.send("row inserted");
                            return res.send({ error: false, data: results, message: 'New report has been created successfully.' });
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
 
module.exports.updateReport = asyncHandler(async(req, res) => {
    let report_id = req.params['id'];
    report_id.trim();
    const validation = new Validator(req.body, {
        report_id: 'required',
        victim_id: 'required',
        report_category: 'required',
        report_description: 'required'
    });
    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            checkReportId(inserts[3], async function(isFound) {
                if (isFound) {
                    // console.log(report);
                    let inserts = {
                        report_id: req.params.id,
                        report_id: req.body.report_id,
                        victim_id: req.body.victim_id,
                        report_category: req.body.report_category,
                        report_description: req.body.report_description,
                        high_zone_area_if_available_id: req.body.high_zone_area_if_available_id
                    }

                    console.log(inserts);
                    if (!report_id || !inserts) {
                        return res.status(400).send({ error: report, message: 'Please provide report and report id' });
                    }

                   await dbConnection.query("UPDATE dms_reports SET ?  WHERE report_id = ?", [inserts, report_id], function(error, results, fields) {
                        if (error) throw error;
                        else {
                            return res.send({ error: false, data: results, message: 'report has been updated successfully.' });
                        }
                    })
                }
            })
        }
    })
})

module.exports.deleteReport = asyncHandler(async (req, res) => {
    let report_id = req.params['id'];
    report_id.trim();
    if (!report_id) {
        return res.status(400).send({ error: true, message: 'Please provide a report id' });
    }
    await dbConnection.query('DELETE FROM dms_reports WHERE report_id = ?', [report_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'report has been delete successfully.' });
    });
})

