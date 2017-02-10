let elasticsearch = require('elasticsearch');
let pokemonJSON = require('./data/pokedex.json')
let client = require('./client')

let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: Infinity
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

pokemonJSON.map( pokemon => {
  client.create({
    index: 'pokedex',
    type: 'pokemon',
    id: pokemon.id,
    body: {
      name: pokemon.name,
      totalStats: pokemon.totalStats,
      HP: pokemon.HP,
      attack: pokemon.attack,
      defense: pokemon.defense,
      spAtk: pokemon.spAtk,
      spDef: pokemon.speed,
      speed: pokemon.speed,
      types: pokemon.types
    }
  }, function (error, response) {
    console.log(response);
  });
})

// client.search({
//   index: 'pokedex',
//   type: 'pokemon',
//   body: {
//     query: {
//       match: {
//         name: 'volcanion'
//       }
//     }
//   }
// }).then(function (resp) {
//     let hits = resp.hits.hits;
//     console.log(hits);
// }, function (err) {
//     console.trace(err.message);
// });