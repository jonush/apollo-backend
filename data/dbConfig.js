const knex = require("knex");

const config = require("../knexfile")[environment];

const environment = process.env.NODE_ENV || "development";

module.exports = knex(config);
