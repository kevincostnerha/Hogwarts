module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getFriends(res, mysql, context, complete){
        mysql.pool.query("SELECT DISTINCT t1.name AS n1, t2.name AS n2 FROM (SELECT student.name, isFriendOf.student FROM isFriendOf INNER JOIN student ON isFriendOf.student = student.student_id) AS t1 INNER JOIN (SELECT student.name, isFriendOf.student FROM isFriendOf INNER JOIN student ON isFriendOf.friend_id = student.student_id) AS t2 ON t1.student = t2.student ORDER BY t1.name", function(error, results, fields){
            if(error){
                res.end();
            }
            context.relationship = results;
            complete();
            
        });
    }

    function getStudents(res, mysql, context){
        mysql.pool.query("SELECT student_id, name FROM student ORDER BY name", function(error, results, fields){
            if(error){
                res.end();
            }
            context.students = results;
        })
    }

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context);
        getFriends(res, mysql, context, complete);
        function complete(){
            res.render('isFriendOf', context);
        }
    })

    router.post('/delete', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM isFriendOf WHERE student = ? AND friend_id = ?";
        var inserts = [req.body.student, req.body.friend];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting to delete the friendship");
            }
        });
        res.redirect('/isFriendOf');
    })

    router.post('/', function(req, res){
        if(req.body.student != req.body.friend){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO isFriendOf (student, friend_id) VALUES (?,?)";
            var inserts = [req.body.student, req.body.friend];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    console.log("An error occurred when attempting to add the friendship");
                }
            });
        } else {
            console.log("Attempted to self-friend...cancelling INSERT operation");
        }
        res.redirect('/isFriendOf');
    })

    router.post('/delete', function(req, res){

    })
    return router;
}();