module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT student.student_id, student.name, location.place FROM student INNER JOIN location ON location.location_id = student.locatedAt", function(error, results, fields){
            if(error){
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    function getLocations(res, mysql, context){
        mysql.pool.query("SELECT location_id, place FROM location", function(error, results, fields){
            if(error){
                res.end();
            }
            context.locations = results;
        });
    }

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE student SET locatedAt = ? WHERE student_id = ?";
        var inserts = [req.body.place, req.body.student];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred when attempting to add a new student");
                res.end();
            } else {
                res.redirect('/isLocatedAt');
            }
        });
    
    })

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getLocations(res, mysql, context);
        getStudents(res, mysql, context, complete);
        function complete(){
            res.render('isLocatedAt', context);
        }
    })   
       
    return router;
}();