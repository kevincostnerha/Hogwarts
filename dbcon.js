var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_hallkenn',
    password: '2293',
    database: 'cs340_hallkenn'
});
module.exports.pool = pool;