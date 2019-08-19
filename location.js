module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT location_id, place, campus FROM location", function(error, results, fields){
            if(error){
                res.end();
            }
            context.locations = results;
            complete();
            
        });
    }

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getLocations(res, mysql, context, complete);
        function complete(){
            res.render('location', context);
        }
    })   
    
     router.post('/delete', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM location WHERE location_id = ?";
        var inserts = [req.body.location_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting the delete operation");
                res.redirect('/location');
            } else {
                res.redirect('/location');
            }
        });
    })

    router.post('/', function(req, res){
        if(req.body.place && req.body.campus){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO location (place, campus) VALUES (?,?)";
            var inserts = [req.body.place, req.body.campus];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                res.redirect('/location');
            });
        } else {
            res.redirect('/location');
        }
    })
    return router;
}();

