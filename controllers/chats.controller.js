const app = require( 'express' );
const {v4: uuidv4} = require( 'uuid' );

const Router = app.Router();
const dbConnection = require( '../config/db.config' );
const {Validator} = require( 'node-input-validator' );
const asyncHandler = require( '../middleware/async' );
// let  payloadChecker = require('payload-validator');

module.exports.getChats = asyncHandler( async ( req, res ) => {
    await dbConnection.query( "SELECT * FROM dms_chats JOIN dms_users ON (dms_users.user_id = dms_chats.sender_id || dms_users.user_id = dms_chats.receiver_id )", ( err, rows, fields ) => {
        if ( !err ) {
            res.send( rows );
        } else {
            console.log( err );
        }
    } )
} )
// module.exports.getLevelsById = asyncHandler( async ( req, res ) => {
//     let level_id = req.params[ 'id' ];
//     level_id.trim();

//     dbConnection.query( "SELECT * FROM dms_levels WHERE level_id = ?",
//         [ user_id ], function ( err, rowsFound, fields ) {
//             if ( !err ) {
//                 return res.send( {success: true, data: rowsFound} );
//             } else {
//                 return res.send( {success: false, data: err} )
//             }
//         } )
// } )
module.exports.createMessage = asyncHandler( async ( req, res ) => {

    const validation = new Validator( req.body, {
        sender_id: 'required|string',
        receiver_id: 'required|string',
        content: 'required|string',
        seen: 'required|boolean'
    } );



    validation.check().then( async ( matched ) => {
        if ( !matched ) {
            return res.status( 422 ).send( validation.errors );
        } else if ( matched ) {

            let inserts = [
                uuidv4(),
                req.body.sender_id,
                req.body.receiver_id,
                req.body.content,
                req.body.seen
            ]
            let sql = "INSERT INTO dms_chats(message_id, sender_id, receiver_id, content, seen) VALUES (?);";
            await dbConnection.query( sql, [ inserts ], ( err, results, fields ) => {
                if ( err ) {

                    res.status( 401 ).send( {success: false, error: err.sqlMessage} )
                    // throw err;
                } else {
                    console.log( results )
                    // results.send("row inserted");
                    return res.send( {success: true, data: results, message: 'New message have been sent successfully'} );
                    // console.log("Row inserted: "+ results.affectedRows);
                }
            } );
        }

    } )
} )
module.exports.updateMessage = asyncHandler( async ( req, res ) => {
    let message_id = req.params[ 'id' ];
    level_id.trim()
    const validation = new Validator( req.body, {
        seen: 'required|boolean'
    } );
    validation.check().then( async ( matched ) => {
        if ( !matched ) {
            res.status( 422 ).send( validation.errors );
        } else if ( matched ) {
            // console.log(level);
            let inserts = {
                level_id: req.params.id,
                level_title: req.body.level_title,
                level_short_bio: req.body.level_short_bio,
                level_system_users_counter: req.body.level_system_users_counter,
                level_status: req.body.level_status,
            }

            console.log( inserts );
            if ( !level_id || !inserts ) {
                return res.status( 400 ).send( {error: level, message: 'Please provide level and level id'} );
            }
            await dbConnection.query( "UPDATE dms_levels SET ?  WHERE level_id = ?", [ inserts, level_id ], function ( error, results, fields ) {
                if ( error ) throw error;
                return res.send( {error: false, data: results, message: 'level has been updated successfully.'} );
            } )
        }
    } );
} );


