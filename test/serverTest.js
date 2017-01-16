////////////////////////////////
// testing code
///////////////////////////////

var request       = require('supertest');
var assert        = require('assert');
var MongoClient   = require('mongodb').MongoClient;
var _common       = require( '../tools/common');
var _crud         = require( '../tools/crud');
var urlDB         = 'mongodb://localhost:27017/expressQuizTest'; // Connection URL DB

///////////////////////////////
// Http test
///////////////////////////////

describe('loading express', function () {

  var server;
  beforeEach(function () {

    server = require('../index');

  });

  afterEach(function () {

    server.close();

  });

  it('responds to /', function testSlash(done) { //test index

    request(server)

      .get('/')
      .expect(200, done);

  });

  it('responds to / post get value doyok', function testPath(done) { // test posting form

    request(server)
      .post('/')
      .field('username', 'doyok')
      .expect(function(res) {

        res.body.username = 'doyok';

      })
      .expect(302, done);

  });

  it('responds to /level without login', function testPath(done) { //test redirect because no login

    request(server)
      .get('/level')
      .expect(function(res) {
        res.headers.location = '/';
      })
      .expect(302, done);
  });

  it('responds to /level with login', function testPath(done) {//with login

    request(server)
      .post('/')
      .field('username', 'doyok')      
      .expect(function(res) {

        res.headers.location = '/level';

      })
      .expect(302, done);

  });

});

////////////////////////////////////
// Test common function
////////////////////////////////////

describe('Test common function', function() {

  it('should uppurcase word, example doyok becoma Doyok', function() {

    var i = _common.ucwords('doyok');
    assert.equal('Doyok', i);

  });

});

////////////////////////////////////
// Test DB function
////////////////////////////////////

describe('Test DB', function() {

  it('should insert player to db', function() {


    MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server

      var data = { username : "duma" }

      _crud.insertPlayer (db, data, function(docs){

        assert.equal(1, docs.length);

      });
    
    });

  });

  it('should find player in db', function() {


    MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server

      var data = { username : "sunaryo" }

      assert.equal(err, null);

      _crud.findAPlayer(db, data, function(err, docs){

        assert.equal(err, null);

      });
    
    });

  });

  it('should update player record to db', function() {


    MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server
    
      var where = { uid : "587c5541b4cded30538cd1f8" }
      var set = { current_value : 10 }

      assert.equal(err, null);

      _crud.updatePlayerRecord(db, where, set, function(err, docs){

        assert.equal(err, null);
        assert.equal(docs.length,  1);

      });
    
    });

  });

  it('find player record from db', function() {

    var data = { uid : "587c584d5c89a7353658d396" }

    MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server

      _crud.findPlayerRecord(db, data, function(err, docs){

        assert.equal(err, null);

      });

    });

  });

  it('should delete player from db', function() {

    var data = { username : "duma" }

    MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server

      _crud.deletePlayer(db, data, function(docs){

        assert.equal(err, null);
        assert.equal(docs.length,  1);
        
      });
    
    });

  });

  it('find high scrore all player', function() {

    MongoClient.connect(urlDB, function(err, db) {//Use connect method to connect to the server
   
    var data = { uid : "587c584d5c89a7353658d396" }

      _crud.findHighscore(db, data, function(err, docs){

      
        assert.equal(err, null);

      });

    });

  });

});