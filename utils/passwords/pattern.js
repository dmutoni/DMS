/**
 * Minimum 8 characters<br>
 * Atleast 1 UPPERCASE letter<br>
 * Atleast 1 LOWERCASE letter<br>
 * Atleast 1 NUMBER<br>
 * Atleast 1 SPECIAL CHARACTER<br>
 * @type {RegExp}
 */
exports.PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
/**
 * NUMBERS PATTERN
 * @type {RegExp}
 */
exports.NUMBER = /^(0|[0-9][0-9]*)$/;