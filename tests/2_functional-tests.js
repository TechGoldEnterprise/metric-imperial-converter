const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', function() {
  describe('GET /api/convert', function() {
    it('Convert a valid input such as 10L', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=10L')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'initNum');
          assert.property(res.body, 'initUnit');
          assert.property(res.body, 'returnNum');
          assert.property(res.body, 'returnUnit');
          assert.property(res.body, 'string');
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.00001);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });
    
    it('Convert an invalid input such as 32g', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'invalid unit');
          done();
        });
    });
    
    it('Convert an invalid number such as 3/7.2/4kg', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'invalid number');
          done();
        });
    });
    
    it('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'invalid number and unit');
          done();
        });
    });
    
    it('Convert with no number such as kg', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'initNum');
          assert.property(res.body, 'initUnit');
          assert.property(res.body, 'returnNum');
          assert.property(res.body, 'returnUnit');
          assert.property(res.body, 'string');
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.00001);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
    });
  });
});