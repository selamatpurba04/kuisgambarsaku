var assert = require('assert');
var ObjectID = require("mongodb").ObjectID;
var _         =   require("underscore"); // programming helpers

/////////////////////////////////////
// function for player
//
//  collection field : 
//  - username => id of the player
//  
/////////////////////////////////////

function insertPlayer (db, data, callback) {

  // Get the player collection
  var collection = db.collection('player');
  
  // Insert data of a player
  collection.insertOne(data, function(err, docs) {

    assert.equal(null, err);
    assert.equal(1, docs.insertedCount);
    callback(err, docs)

  });

}

function findAPlayer(db, data, callback){
  
  var collection = db.collection('player');

  //find data player
	collection.find(data).toArray(function(err, docs) {
    
    assert.equal(null, err);
 		callback(err, docs)

	});

}

function findAllPlayer (db, callback) {

  // Get the player collection
  var collection = db.collection('player');

  // Find all player
  collection.find({}).toArray(function(err, docs) {

    assert.equal(err, null);
    callback(err, docs);

  });

}

function deletePlayer (db, data, callback) {

  // Get the player collection
  var collection = db.collection('player');

  // Find some player
  collection.deleteMany( data, function(err, docs) {

    assert.equal(null, err);
    callback(err, docs);

  });

}

////////////////////////////////////////////////////////////////////////////
// function for playerRecord
//
//  collection field :
// - uid => user id
// - current_value => total of the score after answering puzzle
//
////////////////////////////////////////////////////////////////////////////

function findPlayerRecord(db, data, callback){
  
  var collection = db.collection('playerRecord');

	collection.find(data).toArray(function(err, docs) {

 		callback(err, docs);

	});

}

function findHighscore(db, data, callback){ // function to get list highscore user
  
  var collection = db.collection('playerRecord');

  collection.find( 
    { uid : {$ne : null}, current_value : {$ne : 0} },  // uid not null or value not zero and limit just 10 player
    {}, 
    {limit : 10 })
  .sort( { current_value : -1 } )
  .toArray(function(err, docs){

    var tempPlayerRecord = []

    for(var i in docs){ 

      tempPlayerRecord.push({ _id : ObjectID(docs[i].uid)} ); //save the user id from 'player' to temporary variable

    }

    db.collection('player').find({ $or: tempPlayerRecord}).toArray( function(err, docsPlayer){ // find the username

      var temp = [];

      for(var i in docs){

        for(var a in docsPlayer){

          if( docsPlayer[a]._id == docs[i].uid ){

            temp.push({ // merge the username and value of the highscore player
              
              username : docsPlayer[a].username,
              current_value : docs[i].current_value

            });

          }

        }

      }

      callback(err, temp);

    });

  });

}

function insertPlayerRecord (db, data, callback) {

  // Get the playerRecord collection
  var collection = db.collection('playerRecord');

  // insert data 
  collection.insertOne(data, function(err, r) {

    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    callback(err, r);

  });

}

function deletePlayerRecord (db, data, callback) {

  // Get the playerRecord collection
  var collection = db.collection('playerRecord');

  // delete specific playerRecord
  collection.deleteMany( data, function(err, r) {

    assert.equal(null, err);
    
  });

}

function updatePlayerRecord(db, where, set, callback){

  var collection = db.collection('playerRecord');

  collection.updateOne( where, { $inc: set }, function(err, r) { // update & increase value
      
    assert.equal(null, err);
    callback(err, r);

  });

}

////////////////////////////////////////////////////
// function for answering
//
//  collection field :
//    - uid => user id
//    - value => the value of the question
//    - question => id of the question
//    - answer => answer of the question
//
///////////////////////////////////////////////////

function findAnswering(db, data, callback){
  
  var collection = db.collection('answering');

  //find data answering of the player
	collection.find(data).toArray(function(err, docs) {

	    // assert.equal(null, err);

 		callback(err, docs);

	});

}

function insertAnswering (db, data, callback) {

	// Get the player collection
	var collection = db.collection('answering');

	// insert data answering of the player
	collection.insertOne(data, function(err, r) {

	    assert.equal(null, err);
	    assert.equal(1, r.insertedCount);

	    callback(err, r);

	});

}

exports.insertPlayer        = insertPlayer;
exports.findAllPlayer       = findAllPlayer;
exports.findAPlayer         = findAPlayer;
exports.deletePlayer        = deletePlayer;
exports.findPlayerRecord    = findPlayerRecord;
exports.insertPlayerRecord  = insertPlayerRecord;
exports.deletePlayerRecord  = deletePlayerRecord;
exports.updatePlayerRecord  = updatePlayerRecord;
exports.findAnswering       = findAnswering;
exports.insertAnswering     = insertAnswering;
exports.findHighscore       = findHighscore;
