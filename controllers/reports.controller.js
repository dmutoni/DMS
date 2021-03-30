const app = require('express');
const {v4: uuidv4} = require('uuid');

const Router = app.Router();
const dbConnection = require('../config/db.config');
const {Validator} = require('node-input-validator');
const asyncHandler = require('../middleware/async');


module.exports.getReports = asyncHandler(async (req, res) => {
    try {
        let report_type = req.params['type'];
        switch (report_type) {
            case 'all':
                dbConnection.query("SELECT * FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id)", (err, rows, fields) => {
                    if (!err) {
                        res.send({status: true, data: rows});
                    } else {
                        res.send({status: false, data: err})
                    }
                })
                break;
            case 'pending':
                dbConnection.query("SELECT * FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id) WHERE status='PENDING' ", (err, rows, fields) => {
                    if (!err) {
                        res.send({status: true, data: rows});
                    } else {
                        res.send({status: false, data: err})
                    }
                })
                break;
            case 'declined':
                dbConnection.query("SELECT * FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id) WHERE status='DECLINED' ", (err, rows, fields) => {
                    if (!err) {
                        res.send({status: true, data: rows});
                    } else {
                        res.send({status: false, data: err})
                    }
                })
                break;
            case 'closed':
                dbConnection.query("SELECT * FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id) WHERE status='CLOSED' ", (err, rows, fields) => {
                    if (!err) {
                        res.send({status: true, data: rows});
                    } else {
                        res.send({status: false, data: err})
                    }
                })
                break;
        }
    } catch (error) {
        return res.status(400).send({success: false, data: error});
    }

})
module.exports.getTotalReports = asyncHandler(async (req, res) => {
    try {
        await dbConnection.query("SELECT COUNT(*) AS totalReports FROM dms_reports", (err, rows, fields) => {
            if (!err) {
                return res.status(200).send({success: true, data: rows});
            } else {
                return res.status(400).send({success: false, data: err})
            }
        })
    } catch (error) {
        return res.status(500).send({error: "internal server error"})
    }
})
module.exports.getTotalDeclinedReports = asyncHandler(async (req, res) => {
    try {
        await dbConnection.query("SELECT COUNT(*) AS totalDeclinedReports FROM dms_reports WHERE status = 'DECLINED'", (err, rows, fields) => {
            if (!err) {
                return res.status(200).send({success: true, data: rows});
            } else {
                return res.status(400).send({success: false, data: err})
            }
        })
    } catch (error) {
        return res.status(500).send({error: "internal server error"})
    }
})
module.exports.getTotalPendingReports = asyncHandler(async (req, res) => {
    try {
        await dbConnection.query("SELECT COUNT(*) AS totalPendingReports FROM dms_reports WHERE status = 'PENDING'", (err, rows, fields) => {
            if (!err) {
                return res.status(200).send({success: true, data: rows});
            } else {
                return res.status(400).send({success: false, data: err})
            }
        })
    } catch (error) {
        return res.status(500).send({error: "internal server error"})
    }
})
module.exports.getTotalClosedReports = asyncHandler(async (req, res) => {
    try {
        await dbConnection.query("SELECT COUNT(*) AS totalClosedReports FROM dms_reports WHERE status = 'CLOSED'", (err, rows, fields) => {
            if (!err) {
                return res.status(200).send({success: true, data: rows});
            } else {
                return res.status(400).send({success: false, data: err})
            }
        })
    } catch (error) {
        return res.status(500).send({error: "internal server error"})
    }
})

module.exports.getTotalReportsByDistrictID = asyncHandler(async (req, res) => {
    let district_id = req.params['district_id'];
    district_id.trim();
        try {
            await dbConnection.query("SELECT COUNT(*) AS totalReportsByDistrict FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) WHERE dms_districts.district_id = ?",[district_id], (err, rows, fields) => {
                if (!err) {
                    return res.status(200).send({success: true, data: rows});
                } else {
                    return res.status(400).send({success: false, data: err})
                }
            })
        } catch (error) {
            return res.status(500).send({error: "internal server error"})
        }
    }
)
module.exports.getTotalFundedReportsByDistrictID = asyncHandler(async (req, res) => {
 let district_id = req.params['district_id'];
    district_id.trim();
        try {
            await dbConnection.query("SELECT COUNT(*) AS totalReports FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) WHERE dms_districts.district_id = ?",[district_id], (err, rows, fields) => {
                if (!err) {
                    return res.status(200).send({success: true, data: rows});
                } else {
                    return res.status(400).send({success: false, data: err})
                }
            })
        } catch (error) {
            return res.status(500).send({error: "internal server error"})
        }
    }
)
module.exports.getTotalPendingReportsByDistrictID = asyncHandler(async (req, res) => {
 let district_id = req.params['district_id'];
    district_id.trim();
        try {
            await dbConnection.query("SELECT COUNT(*) AS totalReports FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) WHERE dms_districts.district_id = ?",[district_id], (err, rows, fields) => {
                if (!err) {
                    return res.status(200).send({success: true, data: rows});
                } else {
                    return res.status(400).send({success: false, data: err})
                }
            })
        } catch (error) {
            return res.status(500).send({error: "internal server error"})
        }
    }
)
module.exports.getTotalRejectedReportsByDistrictID = asyncHandler(async (req, res) => {

     let district_id = req.params['district_id'];
    district_id.trim();
        try {
            await dbConnection.query("SELECT COUNT(*) AS totalReports FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) WHERE dms_districts.district_id = ?",[district_id], (err, rows, fields) => {
                if (!err) {
                    return res.status(200).send({success: true, data: rows});
                } else {
                    return res.status(400).send({success: false, data: err})
                }
            })
        } catch (error) {
            return res.status(500).send({error: "internal server error"})
        }
    }
)

module.exports.getTotalReportsBySectorID = asyncHandler(async (req, res) => {
    let sector_id = req.params['sector_id'];
    sector_id.trim();
        try {
            await dbConnection.query("SELECT COUNT(*) AS totalReportsBySectorId FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) WHERE dms_sectors.sector_id = ?",[sector_id], (err, rows, fields) => {
                if (!err) {
                    return res.status(200).send({success: true, data: rows});
                } else {
                    return res.status(400).send({success: false, data: err})
                }
            })
        } catch (error) {
            return res.status(500).send({error: "internal server error"})
        }
    }
)
// function checkLevelId(level_id, callBack) {
//     dbConnection.query("SELECT * FROM dms_levels WHERE level_id = ?", [level_id], function(err, rows, fields) {
//         if (rows.length > 0)
//             callBack(true)
//         else
//             callBack(false)

//     })
// }
const checkReportId = (victim_id, high_risk_zone_id, callBack) => {
    dbConnection.query("SELECT * FROM dms_victims WHERE victim_id = ?", victim_id, function (err, rows, fields) {
        dbConnection.query("SELECT * FROM dms_high_risk_zones WHERE h_zone_id = ?", [high_risk_zone_id], function (err, rowsFound, fields) {
            if (rows.length > 0 && rowsFound.length > 0) {
                callBack(true)
            } else {
                callBack(false)
            }
        })
    })
}

module.exports.getReportsBySector = async (req, res) => {
    let report_id = req.params['id'];
    report_id.trim();

    dbConnection.query("SELECT * FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id)JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) WHERE dms_sectors.sector_id = ?",
        [report_id], function (err, rowsFound, fields) {
            if (!err) {
                res.send({status: true, data: rowsFound});
            } else {
                res.send({status: false, data: err})
            }
        })
    // console.log(report_id)
}

module.exports.getReportsById = asyncHandler(async (req, res) => {
    let report_id = req.params['id'];
    report_id.trim();

    dbConnection.query("SELECT * FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id) WHERE report_id = ?",
        [report_id], function (err, rowsFound, fields) {
            if (!err) {
                res.send({status: true, data: rowsFound});
            } else {
                res.send({status: false, data: err})
            }
        })
})
module.exports.createReport = asyncHandler(async (req, res) => {

    const validation = new Validator(req.body, {
        victim_id: 'required',
        report_title: 'required',
        report_description: 'required',
    });

    validation.check().then(async (matched) => {
        if (!matched) {
            return res.status(422).send(validation.errors);
        } else if (matched) {

            let inserts = [
                uuidv4(),
                req.body.victim_id,
                req.body.report_title,
                req.body.report_description,
                req.body.high_zone_area_if_available_id
            ]
            console.log(inserts[1]);
            console.log(inserts[4])
            checkReportId(inserts[1], inserts[4], async function (isFound) {
                if (isFound) {
                    let sql = "INSERT INTO dms_reports(report_id,victim_id,report_title,report_description,high_zone_area_if_available_id) VALUES (?);";
                    await dbConnection.query(sql, [inserts], (err, results, fields) => {

                        if (err) {

                            res.status(401).send({error: err.sqlMessage})
                            // throw err;
                        } else {
                            // console.log(results)
                            // results.send("row inserted");
                            return res.send({
                                error: false,
                                data: results,
                                message: 'New report has been created successfully.'
                            });
                            // console.log("Row inserted: "+ results.affectedRows);
                        }
                    });
                } else {
                    res.status(404).send({success: false, message: "one of the id entered is not found"})
                    // console.log('Data not found');
                }
            });


        }

    })
})

module.exports.updateReport = asyncHandler(async (req, res) => {
    let report_id = req.params['id'];
    report_id.trim();
    const validation = new Validator(req.body, {
        victim_id: 'required',
        report_title: 'required',
        report_description: 'required'
    });
    validation.check().then((matched) => {
        if (!matched) {
            return res.status(422).send(validation.errors);
        } else if (matched) {
            checkReportId(inserts[3], async function (isFound) {
                if (isFound) {
                    // console.log(report);
                    let inserts = {
                        report_id: req.params.id,
                        victim_id: req.body.victim_id,
                        report_title: req.body.report_title,
                        report_description: req.body.report_description,
                        high_zone_area_if_available_id: req.body.high_zone_area_if_available_id
                    }

                    console.log(inserts);
                    if (!report_id || !inserts) {
                        return res.status(400).send({error: report, message: 'Please provide report and report id'});
                    }

                    await dbConnection.query("UPDATE dms_reports SET ?  WHERE report_id = ?", [inserts, report_id], function (error, results, fields) {
                        if (error) throw error;
                        else {
                            return res.send({
                                error: false,
                                data: results,
                                message: 'report has been updated successfully.'
                            });
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
        return res.status(400).send({error: true, message: 'Please provide a report id'});
    }
    await dbConnection.query('DELETE FROM dms_reports WHERE report_id = ?', [report_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'report has been delete successfully.'});
    });
})

module.exports.returnVictimReportJoined = asyncHandler(async (req, res) => {

    dbConnection.query("SELECT dms_reports.report_title, dms_victims.first_name, dms_victims.last_name , dms_provinces.province_name,dms_districts.district_name FROM dms_reports JOIN dms_victims ON (dms_reports.victim_id = dms_victims.victim_id) JOIN dms_villages ON (dms_villages.village_id = dms_victims.village_id) JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id)", function (err, rowsFound, fields) {
        if (!err) {
            res.send({status: true, data: rowsFound});
        } else {
            res.send({status: false, data: err})
        }
    })
})

module.exports.pushReportToDistrict = async (req, res) => {
    let report_id = req.params['id'];
    report_id.trim();
    if (!req.params) {
        return res.status(400).send({success: false, data: "no provided id"})
    }
    await dbConnection.query("UPDATE dms_reports SET state = ?  WHERE report_id = ?", [1, report_id], function (error, results, fields) {
        if (error) throw error;
        else {
            return res.send({error: false, data: results, message: 'report has been pushed to district successfully.'});
        }
    })
}
module.exports.pushReportToNationalLevel = async (req, res) => {
    let report_id = req.params['id'];
    report_id.trim();
    if (!req.params) {
        return res.status(400).send({success: false, data: "no provided id"})
    }
    await dbConnection.query("UPDATE dms_reports SET state = ?  WHERE report_id = ?", [2, report_id], function (error, results, fields) {
        if (error) throw error;
        else {
            return res.send({error: false, data: results, message: 'report has been pushed to district successfully.'});
        }
    })
}
