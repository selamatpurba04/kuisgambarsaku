/////////////////////////////////////////////////////////////
// Kuis Gambar Saku
// made by Selamat Purba
// Run this script using node js to run the application
/////////////////////////////////////////////////////////////


var express 		= 	require('express'); //node js framework
var app 			= 	express();
var fs 				= 	require('fs'); // read file local
var exphbs 			= 	require('express3-handlebars'); // template engine
var bodyParser 		= 	require('body-parser');
var MongoClient 	= 	require('mongodb').MongoClient;
var assert 			= 	require('assert'); //assertion
var expressSession	= 	require('express-session'); //for session extension for express
var _ 				= 	require("underscore"); // programming helpers
var cookieParser 	= 	require('cookie-parser'); //helpers cookie parser
var urlDB 			= 	'mongodb://localhost:27017/expressQuizTest'; // Connection URL DB

var _crud	 		= 	require( __dirname + '/tools/crud'); // crud function to db
var _level	 		= 	require( __dirname + '/tools/level'); // process get level and next level
var _common	 		= 	require( __dirname + '/tools/common'); //common function

app.set("view engine","handlebars");//setting helpers for handlebars as the engine template  

app.engine("handlebars", exphbs({
	
	defaultLayout:"mainFront"

}));

app.use(cookieParser());//setting helpers cookieParser

app.use(expressSession({secret:'quizGambarSaku'}));//setting helpers expressSession

app.use(bodyParser());//get posted var

app.use(function (req, res, next) {// a middleware function

	var oURL = req.originalUrl; //original
	
	if( oURL == '/' || oURL.indexOf('/static') > -1 || oURL.indexOf('/images') > -1) { //handling static route

  		next();

	}else{

		if( typeof req.session.uid == 'undefined' ) { //handling if there is no username was logged in

    		next(res.redirect('/'));

	  	}else{

	  		next();

	  	}

	}

});

app.use('/static',express.static(__dirname + '/views/dist')); //get the static files, those are css & js
app.use('/images',express.static(__dirname + '/images')); //get the static files, those are images

/////////////////////////////
// area get
/////////////////////////////

app.get('/', function (req, res) { //index

	if( req.session.uid !== undefined ) { // handling if user has logged in, no need to log in again

		res.redirect('/level');

	}

	res.render("front/index", {

		breadcrumbs : "Masukkan Nama Anda",

	});

});

app.get('/level', function (req, res) { //choose level

	_level.getLevel(req, function(err,listPuzzle, docs) { //get list all puzzle

		res.render("front/level", {

			listPuzzle : listPuzzle,
			breadcrumbs : "Pilih Level",
			username : req.session.username,

		});

	});

});

app.get('/guess/level', function (req, res) { //return to choosing level

	res.redirect('/level');

});

app.get('/guess/level/:id', function (req, res) { //guess the answer
	
  	var Question = req.params.id;

	res.render("front/guessLevel", {

		Question : Question,
		breadcrumbs : "",
		value : 10,

	});

});

app.get('/success/:id', function (req, res) { //success page
	
  	var Question = req.params.id;

  	_level.getNextLevel(req, function(nextLevel) {

		res.render("front/success", {

			Question : Question,
			nextLevel : nextLevel,
			CorrectAnswer : "<b>Selamat!</b> Jawaban anda benar!",
			breadcrumbs : "",
			value : 10,

		});

  	});

});

///////////////////////////////
// area post
///////////////////////////////

app.post('/', function(req, res) { //posted index

	var username = req.body.username;

	if ( username !== '' ) { //validasi form
    	
    	var data = { username : username }

		MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server
	  
	  		assert.equal(null, err);

	  		_crud.findAPlayer(db, data, function(err, docs) { //Use username already existed or not

	  			if( docs.length > 0 ) {

    				req.session.username = docs[0].username; //set username session
    				req.session.uid = docs[0]._id; //set uid session
	            	db.close();
    				res.redirect('/level');

	  			}else{

	  				_crud.insertPlayer(db, data, function(docs) { //inser data user if not existed yet in database

	  					req.session.username = username;
	    				req.session.uid = docs.ops[0]._id;
		            	db.close();
    					res.redirect('/level');

					});		

	  			}

	  		});

		});

	} else { //handle not inputed username

		ErrorUsername = '<b>Oops!</b> Username Tidak Boleh Kosong..';	

		res.render("front/index", {
		
			breadcrumbs : "Masukkan Nama Anda",
			ErrorUsername : ErrorUsername,
			username : username,

		});

	}

});

app.post('/guess/level/:id', function(req, res) { // get post guess level
    
    var Question = req.params.id;
    var Answer = _common.ucwords( req.body.answer );
    var value = { Question : Question, Answer : Answer }

    fs.readFile('puzzle.json', 'utf8', function (err,data) { //read file list puzzle
	  
	  	if (err) {
	  
	    	return console.log(err);
	  
	  	}

	  	var listPuzzle = JSON.parse(data);
	  	var where = _.where(listPuzzle, value);//check if question and answer already correct

	  	if( where.length > 0 ) { //if answer is correct

	  		MongoClient.connect(urlDB, function(err, db) {
	  
	  			assert.equal(null, err);

		  		_crud.findAnswering(db, {uid : req.session.uid, question : Question}, function(err,docs) { //handle if user already answer answered question

		  			if( docs.length == 0 ) { //if not answered yet, save to database

		  				var dataInsert = {

		  					uid : req.session.uid,
		  					value : 10,
		  					question : Question,
		  					answer : Answer

		  				}

		  				_crud.insertAnswering(db, dataInsert, function(err, docs) { //save to database data answered

		  					var set = { "current_value" : 10 }

	  						_crud.updatePlayerRecord(db, {uid : req.session.uid}, set, function() {}); //increase current user's value

		  				});

		  			}

		  		});

    			res.redirect('/success/' + Question);

		  	});

	  	}else{ //if answer is wrong

	  		res.render("front/guessLevel", {

				Question : Question,
				answer : Answer,
				breadcrumbs : "",
				value : 10,
				ErrorAnswer : "<b>Oops!</b> Jawaban anda salah.."

			});

	  	}

	});

});

var server = app.listen(3000, function () {//run app

	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});

module.exports = server;