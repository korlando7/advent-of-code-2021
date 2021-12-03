const fs = require('fs');

const parseRows = (file) => {
  const contents = fs.readFileSync(file, 'utf-8');
  return contents.split('\n').map(row => row.trim());
}

const parseIntRows = (file) => {
  const contents = fs.readFileSync(file, 'utf-8');
  return contents.split('\n').map(n => parseInt(n))
}

module.exports = {
  parseRows,
  parseIntRows,
}