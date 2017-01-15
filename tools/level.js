var fs 				= 	require('fs'); // read file local
var MongoClient 	= 	require('mongodb').MongoClient;
var urlDB 			= 	'mongodb://localhost:27017/expressQuizTest'; // Connection URL DB
var assert 			= 	require('assert'); //assertion
var crud	 		= 	require( __dirname + '/crud');
var _ 				= 	require("underscore"); // programming helpers

function getLevel (req, callback) { // get all level and answered level

	fs.readFile('puzzle.json', 'utf8', function (err,data) {
	  
	  	if (err) {
	  
	    	return console.log(err);
	  
	  	}

	  	var listPuzzle = JSON.parse(data);
	  	
	  	MongoClient.connect(urlDB, function(err, db) {
	  
	  		assert.equal(null, err);
			var uid = req.session.uid;

	  		crud.findPlayerRecord(db, {uid : uid}, function(err,docs) { //find player record

	  			if ( docs.length > 0 ) { //if user used to signed

	  				crud.findAnswering(db, {uid : uid}, function(err,docsAnswering) { //find answered level

			  			for (var i in listPuzzle) { 

			  				var where = _.where(docsAnswering, {question : listPuzzle[i].Question} ); //check if there is data already answered by user in db
			  				
			  				if (where.length > 0) {

			  					listPuzzle[i].answered = 1; //push status answered to list level

			  				}

			  			}

  						callback(err, listPuzzle, docs);

			  		});

	  			}else{

	  				var dataInsert = {

	  					uid : uid,
	  					current_value : 0

	  				}

	  				crud.insertPlayerRecord(db, dataInsert, function(err) { //insert data if new user

	  					callback(err, listPuzzle, docs);

	  				});

	  			}

	  		});

		 });

	});

}

function getNextLevel(req, callback) { // get next level after answer the level

	fs.readFile('puzzle.json', 'utf8', function (err,data) {
	  
	  	if (err) {
	  
	    	return console.log(err);
	  
	  	}

	  	var listPuzzle = JSON.parse(data);
	  	var tempQuestion = [];
	  	
	  	for ( var d in listPuzzle ) { //insert list question to temporary variable

	  		tempQuestion.push(listPuzzle[d].Question);

	  	}

		MongoClient.connect(urlDB, function(err, db) {
		  
			assert.equal(null, err);

			crud.findAnswering(db, {uid : req.session.uid}, function(err, docs) { //get answered level by user

				var tempAnswered = [];

				for (var i in docs ) { //push into temporary array

					tempAnswered.push(docs[i].question);

				}

				var difference = _.difference(tempQuestion, tempAnswered); //differentiate between list question & list anwsered question
				var nextLevel = _.first(difference); //get unanswered level as the next level
				
				callback(nextLevel);

			});

		});

	});

}

exports.getLevel = getLevel;
exports.getNextLevel = getNextLevel;