const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');


Router.get("/getAllHighRiskZones", (req, res) => {
    dbConnection.query("SELECT * FROM dms_high_risk_zones", (err, rows, fields) => {
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
function checkUserId(user_id, callBack) {
    dbConnection.query("SELECT * FROM dms_users WHERE user_id = ?", [user_id], function(err, rows, fields) {
        if (rows.length > 0)
            callBack(true)
        else
            callBack(false)

    })
}


Router.post("/createHighRiskZones", function(req, res) {

    const validation = new Validator(req.body, {
        zone_name: 'required',
        registered_by_user_id: 'required',
        done_on: 'required',
        pictures_store: 'required',
        village_id: 'required'
    });



    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {

            let inserts = [
                    uuidv4(),
                    req.body.zone_name,
                    req.body.registered_by_user_id,
                    req.body.done_on,
                    req.body.pictures_store,
                    req.body.village_id
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





            checkUserId(inserts[2], function(isFound) {
                if (isFound) {
                    let sql = "INSERT INTO dms_high_risk_zones(h_zone_id,zone_name, registered_by_user_id, done_on, pictures_store, village_id) VALUES (?);";
                    dbConnection.query(sql, [inserts], (err, results, fields) => {

                        if (err) {

                            res.status(401).send({ error: err.sqlMessage })
                                // throw err;
                        } else {
                            console.log(results)
                                // results.send("row inserted");
                            return res.send({ error: false, data: results, message: 'New h_zone has been created successfully.' });
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
    let h_zone_id = req.params['id'];
    h_zone_id.trim();
    const validation = new Validator(req.body, {
        zone_name: 'required',
        registered_by_user_id: 'required',
        done_on: 'required',
        pictures_store: 'required',
        village_id: 'required'
    });
    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            let inserts = {
                h_zone_id: req.params.id,
                zone_name: req.body.zone_name,
                registered_by_user_id: req.body.registered_by_user_id,
                done_on: req.body.done_on,
                pictures_store: req.body.pictures_store,
                village_id: req.body.village_id
            }
            checkUserId(inserts.registered_by_user_id, function(isFound) {
                if (isFound) {
                    // console.log(h_zone);


                    console.log(inserts);
                    if (!h_zone_id || !inserts) {
                        return res.status(400).send({ error: h_zone, message: 'Please provide h_zone and h_zone id' });
                    }

                    dbConnection.query("UPDATE dms_high_risk_zones SET ?  WHERE h_zone_id = ?", [inserts, h_zone_id], function(error, results, fields) {
                        if (error) throw error;
                        else {
                            return res.send({ error: false, data: results, message: 'h_zone has been updated successfully.' });
                        }
                    })
                } else {
                    res.status(404).send({ message: "Data not found" })
                }
            })
        }
    })
})

Router.delete('/delete/:id', (req, res) => {
    let h_zone_id = req.params['id'];
    h_zone_id.trim();
    if (!h_zone_id) {
        return res.status(400).send({ error: true, message: 'Please provide a h_zone id' });
    }
    dbConnection.query('DELETE FROM dms_high_risk_zones WHERE h_zone_id = ?', [h_zone_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'h_zone has been delete successfully.' });
    });
})

module.exports = Router;