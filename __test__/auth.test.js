/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;
const server = require('../server');
const User = require('../models/user');
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe('Auth', () => {
  // before each test we empty the database
  beforeEach('Dropping database', async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    server.close();

    await User.deleteMany({});
  });

  describe('/POST', () => {
    it('should register user if valid information is provided', done => {
      const user = {
        username: 'Ssendikadiwa',
        email: 'ssendikadiwa@example.com',
        password: 'itssecret20',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          //   expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
