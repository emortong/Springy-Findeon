const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;

describe('GET /api/pokedex', () => {
  it('it should respond with all the documents on the pokedex index', (done) => {
    request(app)
      .get('/api/pokedex')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        expect(resData.hits.total).to.equal(721);
        done()
      })
    })
  })
describe('GET /api/pokedex/:id', () => {
  it('should get be able to get a document by its id', (done) => {
    request(app)
      .get('/api/pokedex/002')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {name} = resData.hits.hits[0]._source;
        expect(name).to.equal('ivysaur')
        done()
      })
    })
  })
describe('GET /api/pokedex/query/:query', () => {
  it('should return psyduck and sylveon when querying "sy"', (done) => {
    request(app)
      .get('/api/pokedex/query/sy')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let sylveon = resData.hits.hits[0]._source.name;
        let psyduck = resData.hits.hits[1]._source.name;
        expect(sylveon).to.equal('sylveon')
        expect(psyduck).to.equal('psyduck')
        done()
      })
    })
  })
describe('GET /api/pokedex/startswith/:prefix', () => {
  it('should return 5 hits when querying the prefix "star"', (done) => {
    request(app)
      .get('/api/pokedex/startswith/star')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(5)
        done()
      })
    })
  })