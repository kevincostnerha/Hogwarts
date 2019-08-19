module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHouses(res, mysql, context, complete){
        mysql.pool.query("SELECT house_id, tower, colors, animal, founder FROM house", function(error, results, fields){
            if(error){
                res.end();
            }
            context.houses = results;
            complete();
            
        });
    }

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getHouses(res, mysql, context, complete);
        function complete(){
            res.render('house', context);
        }
    })   
    
     router.post('/delete', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM house WHERE house_id = ?";
        var inserts = [req.body.house_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("An error occurred while attempting the delete operation");
                res.redirect('/house');
            } else {
                res.redirect('/house');
            }
        });
    })

    router.post('/', function(req, res){
        if(req.body.tower && req.body.colors && req.body.animal && req.body.founder){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO house (tower, colors, animal, founder) VALUES (?,?,?,?)";
            var inserts = [req.body.tower, req.body.colors, req.body.animal, req.body.founder];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.end();
                } else {
                    res.redirect('/house');
                }
            });
        } else {
            res.redirect('/house');
        }
    })
    return router;
}();