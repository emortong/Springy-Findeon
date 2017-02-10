const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000
const api = require('./api/pokedex')

app.use('/api/pokedex', api);

if(process.env.ENVIORNMENT !== 'TEST') {
  app.listen(PORT, function() {
    console.log(`Started connection on port ${PORT}`);
  });
}


module.exports = app;
