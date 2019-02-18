'use strict';

const fs = require('fs');
const path = require('path');
const SUMMARY_FILE_PATH = 'summary.csv';
const DATA_PATH = 'data';

if (fs.existsSync(SUMMARY_FILE_PATH)) {
  fs.unlink(SUMMARY_FILE_PATH);
}

fs.readdir(DATA_PATH, (err, files) => {
  if (err) reject(err);

  for (const file of files) {
    fs.unlink(path.join(DATA_PATH, file), err => {
      if (err) reject(err);
    });
  }
});
