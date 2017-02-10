let elasticsearch = require('elasticsearch');

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

module.exports = client



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