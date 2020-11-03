const app = require('express');
const { v4: uuidv4 } = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const { Validator } = require('node-input-validator');
// let  payloadChecker = require('payload-validator');

Router.get("/getAllLevels", (req, res) => {
    dbConnection.query("SELECT * FROM dms_levels", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})
Router.post("/createNewLevel", function(req, res) {

    const validation = new Validator(req.body, {
        level_title: 'required',
        level_system_users_counter: 'required',
        level_short_bio: 'required',
        level_status: 'required'
    });



    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {

            let inserts = [
                uuidv4(),
                req.body.level_title,
                req.body.level_system_users_counter,
                req.body.level_short_bio,
                req.body.level_status
            ]
            let sql = "INSERT INTO dms_levels(level_id, level_title, level_system_users_counter, level_short_bio, level_status) VALUES (?);";
            dbConnection.query(sql, [inserts], (err, results, fields) => {
                if (err) {

                    res.status(401).send({ error: err.sqlMessage })
                        // throw err;
                } else {
                    console.log(results)
                        // results.send("row inserted");
                    return res.send({ error: false, data: results, message: 'New level has been created successfully.' });
                    // console.log("Row inserted: "+ results.affectedRows);
                }
            });
        }

    })
})
Router.put("/update/:id", (req, res) => {
    let level_id = req.params['id'];
    level_id.trim()
    const validation = new Validator(req.body, {
        level_title: 'required',
        level_system_users_counter: 'required',
        level_short_bio: 'required',
        level_status: 'required'
    });
    validation.check().then((matched) => {
        if (!matched) {
            res.status(422).send(validation.errors);
        } else if (matched) {
            // console.log(level);
            let inserts = {
                level_id: req.params.id,
                level_title: req.body.level_title,
                level_short_bio: req.body.level_short_bio,
                level_system_users_counter: req.body.level_system_users_counter,
                level_status: req.body.level_status,
            }

            console.log(inserts);
            if (!level_id || !inserts) {
                return res.status(400).send({ error: level, message: 'Please provide level and level id' });
            }
            dbConnection.query("UPDATE dms_levels SET ?  WHERE level_id = ?", [inserts, level_id], function(error, results, fields) {
                if (error) throw error;
                return res.send({ error: false, data: results, message: 'level has been updated successfully.' });
            })
        }
    });
});
Router.delete('/delete/:id', (req, res) => {
    let level_id = req.params['id'];
    level_id.trim()
    if (!level_id) {
        return res.status(400).send({ error: true, message: 'Please provide a level id' });
    }
    dbConnection.query('DELETE FROM dms_levels WHERE level_id = ?', [level_id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'level has been delete successfully.' });
    });
})

module.exports = Router;