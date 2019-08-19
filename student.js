module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT student.student_id, student.name, student.blood, house.tower, location.place FROM student INNER JOIN house ON house.house_id = student.dorm INNER JOIN location ON location.location_id = student.locatedAt", function(error, results, fields){
            if(error){
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    router.post('/delete', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student WHERE student_id = ?";
        var inserts = [req.body.student_to_delete];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting the delete operation");
                res.redirect('/student');
            } else {
                res.redirect('/student');
            }
        });
    })

    router.post('/', function(req, res){
        if(req.body.name && req.body.blood && req.body.dorm && req.body.locatedAt){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO student (name, blood, dorm, locatedAt) VALUES (?,?,?,?)";
            var inserts = [req.body.name, req.body.blood, req.body.dorm, req.body.locatedAt];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    console.log("An error occurred when attempting to add a new student");
                    res.end();
                } else {
                    res.redirect('/student');
                }
            });
        } else {
            res.redirect('/student');
        }
    })

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        function complete(){
            res.render('student', context);
        }
    })   
       
    return router;
}();
