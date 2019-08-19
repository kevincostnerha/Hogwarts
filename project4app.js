var express = require('express');
var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout: 'default'});
var app = express();


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 30022);
app.set('mysql', mysql);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/house', require('./house.js'));

app.use('/student', require('./student.js'));

app.use('/class', require('./class.js'));

app.use('/takes', require('./takes.js'));

app.use('/location', require('./location.js'));

app.use('/isFriendOf', require('./isFriendOf.js'));

app.use('/isLocatedAt', require('./isLocatedAt.js'));

app.use('/dorm', require('./dorm.js'));

app.use('/', function(req, res){
    res.status(200);
    res.render('index');
});

app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port') + ". Ctrl-c to stop.\n");
});