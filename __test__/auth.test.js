const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../server');
const User = require('../models/user');
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

let dummyUser;

describe('AUTH', () => {
  before(async () => {
    await User.deleteMany({});
    // create new user dummy object
    dummyUser = {
      username: 'sendi',
      email: 'sendii@gmail.com',
      password: 'secretss',
    };
    await new User(dummyUser).save();
  });
  after(async () => {
    server.close();
    await User.deleteMany({});
  });

  it('Should successfully register new user', async () => {
    const user = {
      username: 'Sendikadiwa',
      email: 'sendi@gmail.com',
      password: 'secrets',
    };
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(response.status).to.equal(200);
    expect(response.body.user).to.have.property('_id');
    expect(response.body.user).to.have.property('username');
    expect(response.body.user).to.have.property('email');
    expect(response.body).to.have.an('object');

    // check if new user exists in the User collection
    const foundUser = await User.findOne({ email: user.email });
    expect(foundUser.username).to.equal('Sendikadiwa');
    expect(foundUser.email).to.equal('sendi@gmail.com');
  });
  it('Should return 500 error if user registers with existing email', async () => {
    const user = {
      username: 'Sendikadiwa',
      email: 'sendi@gmail.com',
      password: 'secrets',
    };
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user);
    expect(response.status).to.equal(400);
  });
  it('Should return 400 error if email is not provided', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({ username: 'Stephen', email: '', password: 'password' });
    expect(response.status).to.equal(400);
  });
  it('Should return 400 error if password is not provided', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({ username: 'Stephen', email: 'stephen@test.com', password: '' });
    expect(response.status).to.equal(400);
  });
  it('Should login in user successfully', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({ email: dummyUser.email, password: dummyUser.password });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });
  it('Should return 400 if user email is not known on signin', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({ email: 'sendi1@gmail.com', password: dummyUser.password });
    expect(response.status).to.equal(400);
  });
  it('Should return 401 if user enters wrong password', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({ email: dummyUser.email, password: 'dummyUser.password' });
    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal('Email or password is incorrect');
  });
  it('Should signout user successfully', async () => {
    const response = await chai
      .request(server)
      .post('/api/v1/auth/signout')
      .send({});
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Signout success');
  });
});
