const dotenv = require('dotenv');
dotenv.config();
var knex = require('knex')({
  client: 'mysql',
  connection: {
    //host : '18.158.238.175',
    host: process.env['DATABASE_HOST'],
    user: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASSWORD'],
    database: process.env['DATABASE_NAME'],
  },
});
module.exports = knex;
