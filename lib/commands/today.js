'use strict';

const async = require('async');
const chalk = require('chalk');

const client = require('../client');
const token = require('../token');
const error = require('../error');

module.exports = () => {
  async.waterfall([
    function getAccountId(done) {
      client.getAccountId(token, done);
    },
    function getSpendToday(accountId, done) {
      client.getSpendToday(token, accountId, done);
    }
  ], (err, spendToday) => {
    if (err) return error(err);
    const credit = spendToday < 0;
    const color = credit ? 'green' : 'red';
    const prefix = credit ? '+' : '-';

    console.log(chalk[color](`${prefix}£${spendToday}`));
  });
};
