const fs = require('fs');

const parseRows = (file) => {
  const contents = fs.readFileSync(file, 'utf-8');
  return contents.split('\n').map(row => row.trim());
}

const parseIntRows = (file) => {
  const contents = fs.readFileSync(file, 'utf-8');
  return contents.split('\n').map(n => parseInt(n))
}

const parseCsvInts = (file) => {
  const contents = fs.readFileSync(file, 'utf-8');
  return contents.trim().split(',').map(n => parseInt(n, 10));
}

module.exports = {
  parseRows,
  parseIntRows,
  parseCsvInts,
}