var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/expressQuizTest';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  
  assert.equal(null, err);
  
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    
    findDocuments(db, function() {
    
      findDocumenta3(db, function() {
        
        findDocuments(db, function() {
        
          updateDocument(db, function() {

            findDocuments(db, function() {
              
              removeDocument(db, function() {

                findDocuments(db, function() {
                  
                  indexCollection(db, function() {
                  
                    db.close();
      
                  });

                });

              });

            });

          });

        });

      });

    });

  });
  

});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {image : ''. answer : ''}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
