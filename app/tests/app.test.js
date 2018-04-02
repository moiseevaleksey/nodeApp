const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('get blogs', () => {
  it('response status 200', (done) => {
    request(app).get("/blogs")
      .expect(200)
      .end(done);
  });
  it('response format json/utf-8', (done) => {
    request(app).get("/blogs")
      .expect('Content-type', 'application/json; charset=utf-8')
      .end(done);
  });
  it('should post successfully', (done) => {
    request(app).post("/blogs")
      .send({
        title: 'qwe',
        author: 'qwe',
        body: 'qwe',
        date: Date.now()
      })
      .expect(200)
      .end(done);
  });
});