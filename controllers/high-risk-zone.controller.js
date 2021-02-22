const app = require( 'express' );
const {v4: uuidv4} = require( 'uuid' );
const multer = require( 'multer' );
const Router = app.Router();
const dbConnection = require( '../config/db.config' );
const {Validator} = require( 'node-input-validator' );
const asyncHandler = require( '../middleware/async' );


module.exports.get_h_zones = asyncHandler( async ( req, res ) => {
    // SELECT * FROM dms_h_zone_images RIGHT JOIN dms_images ON (dms_images.dms_images_id = dms_h_zone_images.dms_h_zone_image_id) RIGHT JOIN dms_high_risk_zones ON (dms_high_risk_zones.h_zone_id = dms_h_zone_images.dms_h_zone_id) RIGHT JOIN dms_villages ON (dms_villages.village_id = dms_high_risk_zones.village_id) RIGHT JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) RIGHT JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) RIGHT JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) RIGHT JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id)
    await dbConnection.query( "SELECT * FROM dms_high_risk_zones", ( err, rows, fields ) => {
        if ( !err ) {
            res.send( rows );
        } else {
            console.log( err );
        }
    } )
} )

module.exports.get_h_zoneById = asyncHandler( async ( req, res ) => {
    let h_zone_id = req.params[ 'id' ];
    h_zone_id.trim();

    dbConnection.query( "SELECT * FROM dms_h_zone_images RIGHT JOIN dms_images ON (dms_images.dms_images_id = dms_h_zone_images.dms_h_zone_image_id) RIGHT JOIN dms_high_risk_zones ON (dms_high_risk_zones.h_zone_id = dms_h_zone_images.dms_h_zone_id) RIGHT JOIN dms_villages ON (dms_villages.village_id = dms_high_risk_zones.village_id) RIGHT JOIN dms_cells ON (dms_cells.cell_id = dms_villages.cell_id) RIGHT JOIN dms_sectors ON (dms_sectors.sector_id = dms_cells.sector_id) RIGHT JOIN dms_districts ON (dms_districts.district_id = dms_sectors.district_id) RIGHT JOIN dms_provinces ON (dms_provinces.province_id = dms_districts.province_id) WHERE h_zone_id = ?",
        [ h_zone_id ], function ( err, rowsFound, fields ) {
            if ( !err ) {
                return res.send( {success: true, data: rowsFound} );
            } else {
                return res.send( {success: false, data: err} )
            }
        } )
} )

function checkUserId( user_id, callBack ) {
    dbConnection.query( "SELECT * FROM dms_users WHERE user_id = ?", [ user_id ], function ( err, rows, fields ) {
        if ( rows.length > 0 )
            callBack( true )
        else
            callBack( false )

    } )
}


module.exports.create_h_images = async ( req, res ) => {
    let user_response;
    try {
        let pictureInserts = req.files.map( file => {
            return [
                uuidv4(),
                file.filename,
            ]
        } )
        let h_zone_images = [
        ]
        console.log( req.params.id );

        for ( let index = 0; index < pictureInserts.length; index++ ) {
            const element = pictureInserts[ index ];
            h_zone_images.push( [ req.params.id, element[ 0 ] ] )
        }

        let sql2 = "INSERT INTO dms_images(dms_images_id,dms_images) VALUES ?;";
        await dbConnection.query( sql2, [ pictureInserts ], ( err, results, fields ) => {
            if ( err ) {
                fs.unlink( 'images' + req.file.filename, () => {
                    return res.status( 404 ).send( {message: "error occurred"} )
                } )
                return res.status( 401 ).send( {error: err.sqlMessage} )
            } else {
                user_response2 = {error: false, data: results, message: "New picture has been inserted", message2: user_response}
            }
        } )
        let sql3 = "INSERT INTO dms_h_zone_images(dms_h_zone_id,dms_h_zone_image_id) VALUES ?;";
        await dbConnection.query( sql3, [ h_zone_images ], ( err, results, fields ) => {
            if ( err ) {
                return res.status( 401 ).send( {error: err.sqlMessage} )
            } else {
                return res.status( 201 ).send( {error: false, data: results, message: "New record has been inserted", message2: user_response, message3: user_response2} );
            }
        } )
    }
    catch ( e ) {
        return res.status( 500 ).send( {message: "error"} )
    }
}

module.exports.create_h_zone = asyncHandler( async ( req, res ) => {
    try {
        console.log( "files ", req.files );
        console.log( "body inputs ", req.body );
    } catch ( e ) {
        console.log( e );
    }
    const validation = new Validator( req.body, {
        zone_name: 'required',
        registered_by_user_id: 'required',
        village_id: 'required'
    } );

    // const pictures validation = new Validator(req,)

    validation.check().then( async ( matched ) => {
        if ( !matched ) {
            res.status( 422 ).send( validation.errors );
        } else if ( matched ) {

            let inserts = [
                uuidv4(),
                req.body.zone_name,
                req.body.registered_by_user_id,
                req.body.village_id
            ]
            checkUserId( inserts[ 2 ], async function ( isFound ) {
                if ( isFound ) {
                    let sql = "INSERT INTO dms_high_risk_zones(h_zone_id,zone_name, registered_by_user_id,village_id) VALUES (?);";
                    await dbConnection.query( sql, [ inserts ], ( err, results, fields ) => {

                        if ( err ) {
                            return res.status( 401 ).send( {error: err.sqlMessage} )
                        } else {
                            console.log( results )
                            return res.status( 201 ).send( {error: false, data: inserts, message: 'New h_zone has been created successfully.'} );
                            // console.log("Row inserted: "+ results.affectedRows);
                        }
                    } );

                } else {
                    return res.status( 404 ).send( {message: "Registered user id not found"} )
                }
            } );


        }

    } )
} )

module.exports.update_h_zone = asyncHandler( async ( req, res ) => {
    let h_zone_id = req.params[ 'id' ];
    h_zone_id.trim();
    const validation = new Validator( req.body, {
        zone_name: 'required',
        registered_by_user_id: 'required',
        done_on: 'required',
        pictures_store: 'required',
        village_id: 'required'
    } );
    validation.check().then( async ( matched ) => {
        if ( !matched ) {
            res.status( 422 ).send( validation.errors );
        } else if ( matched ) {
            let inserts = {
                h_zone_id: req.params.id,
                zone_name: req.body.zone_name,
                registered_by_user_id: req.body.registered_by_user_id,
                done_on: req.body.done_on,
                pictures_store: req.body.pictures_store,
                village_id: req.body.village_id
            }
            checkUserId( inserts.registered_by_user_id, async function ( isFound ) {
                if ( isFound ) {
                    // console.log(h_zone);


                    console.log( inserts );
                    if ( !h_zone_id || !inserts ) {
                        return res.status( 400 ).send( {error: h_zone, message: 'Please provide h_zone and h_zone id'} );
                    }

                    await dbConnection.query( "UPDATE dms_high_risk_zones SET ?  WHERE h_zone_id = ?", [ inserts, h_zone_id ], function ( error, results, fields ) {
                        if ( error ) throw error;
                        else {
                            return res.send( {error: false, data: results, message: 'h_zone has been updated successfully.'} );
                        }
                    } )
                } else {
                    res.status( 404 ).send( {message: "Data not found"} )
                }
            } )
        }
    } )
} )

module.exports.delete_h_zone = asyncHandler( async ( req, res ) => {
    let h_zone_id = req.params[ 'id' ];
    h_zone_id.trim();
    if ( !h_zone_id ) {
        return res.status( 400 ).send( {error: true, message: 'Please provide a h_zone id'} );
    }
    await dbConnection.query( 'DELETE FROM dms_high_risk_zones WHERE h_zone_id = ?', [ h_zone_id ], function ( error, results, fields ) {
        if ( error ) throw error;
        return res.send( {error: false, data: results, message: 'h_zone has been delete successfully.'} );
    } );
} )

