const ObjectId = require('mongoose').Types.ObjectId;

exports.validObjectId = (id) => {
    return ((ObjectId.isValid(id)));
};

exports.generateVictimPin = () => {
   return Math.floor(100000 + Math.random() * 900000);
}

/**
 * GET API RESPONSE
 * @param success
 * @param message
 * @param err
 * @param status
 * @param extra
 * @returns object
 * @constructor
 */
exports.API_RESPONSE = (success, message, err, status, extra=null) => {
    if (success) return {success: success,  message: message,  status: status, extra}
    return { success: success, message: message, error: err, status: status, extra}
}
