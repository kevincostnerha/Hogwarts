module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getTakes(res, mysql, context, complete){
        mysql.pool.query("SELECT DISTINCT t1.name, t2.course FROM (SELECT student.name, takes.student_id, takes.class_id FROM takes INNER JOIN student ON takes.student_id = student.student_id) AS t1 INNER JOIN (SELECT class.course, takes.class_id FROM takes INNER JOIN class ON takes.class_id = class.class_id) AS t2 ON t1.class_id = t2.class_id", function(error, results, fields){
            if(error){
                res.end();
            }
            context.takes = results;
            complete();
            
        });
    }

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getTakes(res, mysql, context, complete);
        function complete(){
            res.render('takes', context);
        }
    })
    return router;
}();