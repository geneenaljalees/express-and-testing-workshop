const request = require('supertest');

const app = require('../app');

//Fill this with many many tests YAY!! 😜😩
test('GET /facsters returns and array of Facsters', (done) => {
  request(app)
    .get('/facsters')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].firstname).toBe('Abdullah');
      done();
    });
});

test('GET /facsters/:name should return facster by name', (done) => {
  request(app)
    .get('/facsters/amelie')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toBe(200);
      expect(res.body.firstname.toLowerCase()).toBe('amelie');
      done();
    });
});

test('POST /facster/new should add a new facster', (done) => {
  const newFacster = {
    id: 7,
    firstname: 'Geneen',
    surname: 'Dev',
    cohort: 11,
  };
  request(app)
    .post('/facster/new')
    .send(newFacster)
    .expect(201)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toHaveProperty('id');
      expect(res.body.firstname).toBe('Geneen');
      expect(res.body.surname).toBe('Dev');
      expect(res.body.cohort).toBe(11);
      done();
    });
});
test('GET /facsters/:name/hobby should return facster hobby', (done) => {
  request(app)
    .get('/facsters/amelie/hobby')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body.hobby).toBe('baking french breads');
      done();
    });

  request(app)
    .get('/facsters/aseel/hobby')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body.hobby).toBe('Pro Athlete');
      done();
    });
});

test('GET /facsters/:name/superpower should return facster superpower', (done) => {
  request(app)
    .get('/facsters/amelie/superpower')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body.superpower).toBe('this variable afficionado');
      done();
    });

  request(app)
    .get('/facsters/aseel/superpower')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body.superpower).toBe('Burning down cocoa fields');
      done();
    });
});
