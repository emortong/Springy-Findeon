let elasticsearch = require('elasticsearch');
let pokemonJSON = require('./data/pokedex.json')
let client = require('./client')

pokemonJSON.map( (pokemon, i) => {
  client.create({
    index: 'pokedex',
    type: 'pokemon',
    id: i,
    body: {
      name: pokemon.name,
      totalStats: Number(pokemon.totalStats),
      HP: Number(pokemon.HP),
      attack: Number(pokemon.attack),
      defense: Number(pokemon.defense),
      spAtk: Number(pokemon.spAtk),
      spDef: Number(pokemon.speed),
      speed: Number(pokemon.speed),
      types: pokemon.types
    }
  }, function (error, response) {
    console.log(response);
  });
})