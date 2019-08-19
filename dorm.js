module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT student.student_id, student.name, house.tower FROM student INNER JOIN house ON house.house_id = student.dorm", function(error, results, fields){
            if(error){
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    function getHouses(res, mysql, context){
        mysql.pool.query("SELECT house_id, tower FROM house", function(error, results, fields){
            if(error){
                res.end();
            }
            context.houses = results;
        });
    }

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE student SET dorm = ? WHERE student_id = ?";
        var inserts = [req.body.dorm, req.body.student];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred when attempting to update the dorm");
                res.end();
            } else {
                res.redirect('/dorm');
            }
        });
    })

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getHouses(res, mysql, context);
        getStudents(res, mysql, context, complete);
        function complete(){
            res.render('dorm', context);
        }
    })   
       
    return router;
}();