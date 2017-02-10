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
    let pair = req.params.statValue.split('-')
    let stat = pair[0];
    let value = Number(pair[1]);
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          match : {
            [`${stat}`]: value
          }
        }
      }
    }).then(function (resp) {
        res.json(resp)
    }, function (err) {
        console.trace(err.message);
    })
  })

router.route('/statAboveValue/:statValue')
  .get((req, res) => {
    let pair = req.params.statValue.split('-');
    let stat = pair[0];
    let value = Number(pair[1]);
    console.log(value);
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          range: {
            [`${stat}`]: {
              gte: value,
              boost: 2.0
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

router.route('/statBelowValue/:statValue')
  .get((req, res) => {
    let pair = req.params.statValue.split('-');
    let stat = pair[0];
    let value = Number(pair[1]);
    console.log(value);
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          range: {
            [`${stat}`]: {
              lt: value
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

router.route('/statBetweenValue/:statValue')
  .get((req, res) => {
    let pair = req.params.statValue.split('-');
    let stat = pair[0];
    let lowVal = Number(pair[1]);
    let highVal = Number(pair[2]);
    client.search({
      index: 'pokedex',
      type: 'pokemon',
      body: {
        query: {
          range: {
            [`${stat}`]: {
              gt: lowVal,
              lt: highVal
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


module.exports = router;
