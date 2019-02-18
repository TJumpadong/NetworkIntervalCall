'use strict';

require('dotenv').config();
const fs = require('fs');
const request = require('request');
const Promise = require('bluebird');

const url = process.env.TARGET_URL;
const MAX = 2500;
const LIMIT = 20;
let page = 1;

const poll = () => Promise.resolve().then(() => {
  const total = page * LIMIT;
  console.log(`Polling ${ total }/${ MAX }`);

  // i.e. http://api.domain.com/fetch?limit=10&page=0
  request(`${ url }?limit=${ LIMIT }&page=${ page }`).pipe(fs.createWriteStream(`data/file-${ page }.csv`));
  ++page;

  if (total > MAX) {
    console.log('Done');
    return Promise.resolve();
  }

  return Promise.delay(2000).then(poll);
});

if (url) {
  poll();
} else {
  console.error('No url provided');
}
