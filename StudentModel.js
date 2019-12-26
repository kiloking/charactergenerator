const connection = require('./connection');
const StudentSchema = require('./StudentSchema');

let StudentModel = connection.model('Student', StudentSchema);

module.exports = StudentModel;
