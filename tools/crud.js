var assert = require('assert');

//player

function insertPlayer (db, data, callback) {

  // Get the player collection
  var collection = db.collection('player');
  
  // Insert some documents
  collection.insertOne(data, function(err, docs) {

    assert.equal(null, err);
    assert.equal(1, docs.insertedCount);
    callback(docs);
    db.close();
    
  });

}

function findAPlayer(db, data, callback){
  
  	var collection = db.collection('player');

	collection.find(data).toArray(function(err, docs) {

	    assert.equal(null, err);

 		callback(docs)

	});

}

function findAllPlayer (db, callback) {

  // Get the player collection
  var collection = db.collection('playerRecord');

  // Find some player
  collection.find({}).toArray(function(err, docs) {

    assert.equal(err, null);
    callback(docs);

  });

}

function findPlayerRecord(db, data, callback){
  
  	var collection = db.collection('playerRecord');

	collection.find(data).toArray(function(err, docs) {

	    // assert.equal(null, err);

 		callback(err, docs);

	});

}

function insertPlayerRecord (db, data, callback) {

  // Get the player collection
  var collection = db.collection('playerRecord');

  // Find some player
  collection.insertOne(data, function(err, r) {

    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    db.close();
    callback(err, r);

  });

}

function deletePlayerRecord (db, callback) {

  // Get the player collection
  var collection = db.collection('playerRecord');

  // Find some player
  collection.deleteMany({uid:'587776772f29432db64fcfe9'}, function(err, r) {

    assert.equal(null, err);

    db.close();
    
  });

}

function findAnswering(db, data, callback){
  
  	var collection = db.collection('answering');

	collection.find(data).toArray(function(err, docs) {

	    // assert.equal(null, err);

 		callback(err, docs);

	});

}

function insertAnswering (db, data, callback) {

	// Get the player collection
	var collection = db.collection('answering');

	// Find some player
	collection.insertOne(data, function(err, r) {

	    assert.equal(null, err);
	    assert.equal(1, r.insertedCount);

	    db.close();
	    callback(err, r);

	});

}

function updatePlayerRecord(db, where, set, callback){

  	var collection = db.collection('playerRecord');

	collection.findOneAndUpdate( where, {$inc: set}, {

        returnOriginal: false,
        upsert: true

    }, function(err, r) {
    	
    	db.close();
    	callback(err, r);

    });

}

exports.insertPlayer = insertPlayer;
exports.findAllPlayer = findAllPlayer;
exports.findAPlayer = findAPlayer;
exports.findPlayerRecord = findPlayerRecord;
exports.insertPlayerRecord = insertPlayerRecord;
exports.deletePlayerRecord = deletePlayerRecord;
exports.findAnswering = findAnswering;
exports.insertAnswering = insertAnswering;
exports.updatePlayerRecord = updatePlayerRecord;