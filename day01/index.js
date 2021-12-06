const { parseIntRows } = require('../utils/parser');

const measurements = parseIntRows('./input.txt');


const getIncMeasurementCount = (measurements, groupByN = 0) => {
  let prev = Infinity;
  let total = 0;

  let len = measurements.length;

  if (groupByN) {
    len -= len % groupByN;
  }

  for (let i = 0; i < len; i++) {
    let curr = measurements[i];
    for (let j = 1; j < groupByN; j++) {
      curr += measurements[i + j];
    }

    if (curr > prev) {
      total++;
    }

    prev = curr;
  }
  return total;
}

const day1Pt1 = () => { 
  return getIncMeasurementCount(measurements);
}

const day1Pt2 = () => {
  return getIncMeasurementCount(measurements, 3);
}


console.log(day1Pt1()); // 1477
console.log(day1Pt2()); // 1523