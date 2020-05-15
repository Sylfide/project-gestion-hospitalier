const { Client } = require('pg');

const client = new Client(process.env.PG_URL_TEST);

client.connect();

module.exports = client;