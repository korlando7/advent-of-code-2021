const fs = require('fs');
const { parseIntRows } = require('../utils/parser');

const measurements = parseIntRows(fs.readFileSync('./input.txt', 'utf-8'));

const day1Pt1 = () => { 
  let prev = Infinity;
  let total = 0

  measurements.forEach(measurement => {
    if (measurement > prev) {
      total++;
    }

    prev = measurement;
  })

  return total;
}

const day1Pt2 = () => {
  let prev = Infinity;
  let total = 0;
  const len = measurements.length - measurements.length % 3;
  for (let i = 0; i < len; i++) {
    const curr = measurements[i] + measurements[i + 1] + measurements[i + 2];
    if (curr > prev) {
      total++;
    }

    prev = curr;
  }

  return total;
}


console.log(day1Pt1());
console.log(day1Pt2());