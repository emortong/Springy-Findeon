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
        expect(resData.hits.total).to.equal(800);
        done()
      })
    })
  })
describe('GET /api/pokedex/:id', () => {
  it('should get be able to get a document by its id', (done) => {
    request(app)
      .get('/api/pokedex/2')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {name} = resData.hits.hits[0]._source;
        expect(name).to.equal('venusaur')
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
        let psyduck = resData.hits.hits[0]._source.name;
        let sylveon = resData.hits.hits[1]._source.name;
        expect(psyduck).to.equal('psyduck')
        expect(sylveon).to.equal('sylveon')
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
describe('GET /api/pokedex/typesOr/:types', () => {
  it('should return 64 hits when querying the types "fire"', (done) => {
    request(app)
      .get('/api/pokedex/typesOr/fire')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(64)
        done()
      })
    })
    it('should return 105 hits when querying the types "fire and ice"', (done) => {
    request(app)
      .get('/api/pokedex/typesOr/fire&ice')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(105)
        done()
      })
    })
  })
describe('GET /api/pokedex/typesAnd/:types', () => {
  it('should return 64 hits when querying the types "fire"', (done) => {
    request(app)
      .get('/api/pokedex/typesAnd/fire')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(64)
        done()
      })
    })
    it('should return 3 hits when querying the types "water and grass"', (done) => {
    request(app)
      .get('/api/pokedex/typesAnd/water&grass')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(3)
        done()
      })
    })
  })
describe('GET /api/pokedex/statValue/:statValue', () => {
  it('should return 1 hit when stat is HP and value is 160', (done) => {
    request(app)
      .get('/api/pokedex/statValue/HP-160')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(1)
        done()
      })
    })
   it('should return pokemons whose attack is greater than 180', (done) => {
    request(app)
      .get('/api/pokedex/statAboveValue/attack-180')
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
describe('GET /api/pokedex/statBelowValue/:statValue', () => {
  it('should return pokemons whose defense is below 10', (done) => {
    request(app)
      .get('/api/pokedex/statBelowValue/defense-10')
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        let resData = JSON.parse(res.text);
        let {total} = resData.hits;
        expect(total).to.equal(2)
        done()
      })
    })
})

describe('GET /api/pokedex/statBetweenValue/:statValue', () => {
  it('should return pokemons where the stat property is greater than or equal to low and less than the high parameter', (done) => {
    request(app)
      .get('/api/pokedex/statBetweenValue/totalStats-750-800')
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