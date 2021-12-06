const fs = require('fs');
const { parseCsvInts } = require('../utils/parser');

const day6Pt1 = (days) => {
  const ages = parseCsvInts('./input.txt');
  let newFishToAdd = 0;

  for (let i = 0; i < days; i++) {
    for (let j = 0; j < ages.length; j++) {
      if (ages[j] === 0) {
        ages[j] = 7;
        newFishToAdd++;
      }

      ages[j]--;
    }

    for (let j = 0; j < newFishToAdd; j++) {
      ages.push(8);
    }
    newFishToAdd = 0;
  }

  return ages.length;
}

const day6Pt2 = (days) => {
  const ages = parseCsvInts('./input.txt');
  const agesMap = ages.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  let agesToReset = 0;
  

  for (let i = 1; i <= days; i++) {
    for (let j = 0; j <= 8; j++) {
      if (agesMap[j]) {
        if (j === 0) {
          agesToReset = agesMap[j];
        } else {
          agesMap[j - 1] = agesMap[j];
        }
        agesMap[j] = 0;
      }
    }
    agesMap[6] = (agesMap[6] || 0) + agesToReset;
    agesMap[8] = agesToReset;
    agesToReset = 0;
  }
  
  return Object.values(agesMap).reduce((acc, curr) => curr + acc, 0);
}

console.log(day6Pt1(80));
console.log(day6Pt2(256));