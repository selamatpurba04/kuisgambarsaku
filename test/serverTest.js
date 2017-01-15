var request = require('supertest');

describe('loading express', function () {

  var server;
  beforeEach(function () {

    server = require('../index');

  });

  afterEach(function () {

    server.close();

  });

  it('responds to /', function testSlash(done) {

    request(server)

      .get('/')
      .expect(200, done);

  });

  it('responds to / post', function testPath(done) {

    request(server)
      .post('/')
      .field('username', 'doyok')
      .expect(302, function(res) {

        res.body.username = 'doyok';

      },done);

  });

});