const express = require('express');
const router = express.Router();
const client = require('../client.js')

router.route('/')
  .get((req, res) => {
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          match_all: {}
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/:id')
  .get((req, res) => {
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          match: {
            _id: req.params.id
          }
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/query/:query')
  .get((req, res) => {
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          wildcard: {
            name: `*${req.params.query}*`
          }
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/startswith/:prefix')
  .get((req, res) => {
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          match_phrase_prefix: {
            name: req.params.prefix
          }
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/typesOr/:type')
  .get((req, res) => {
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          match: {
            types: {
              query: req.params.type.split('&').join(','),
              operator: 'or'
            }
          }
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/typesAnd/:type')
  .get((req, res) => {
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          match: {
            types: {
              query: req.params.type.split('&').join(','),
              operator: 'and'
            }
          }
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/statValue/:statValue')
  .get((req, res) => {
    let statValue = req.params.statValue.split('-').join(':');
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      q: `${statValue}`
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })


module.exports = router;
