const express = require('express');
const app = express();
const consign = require('consign');
require('./utils/prototype');

consign()
    .include('./config/middleware.js')
    .then('./helpers')
    .then('./services')
    .then('./routes')
    .into(app);

app.db = require('./config/database');

let PORTA = 3030;
app.listen(PORTA, () => console.log(`Pronto para usar! (http://localhost:${PORTA}/)`));

module.exports = app;

