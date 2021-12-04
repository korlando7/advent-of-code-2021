const { once } = require('events');
const fs = require('fs');
const readline = require('readline');

const day2Pt1 = async(file) => {
  let x = 0;
  let y = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  });

  rl.on('line', (line) => {
    let [dir, val] = line.split(' ');
    val = parseInt(val, 10);

    switch (dir) {
      case 'forward':
        x += val;
        break;
      case 'down':
        y += val;
        break;
      case 'up':
        y -= val;
        break;
    }
  });

  await once(rl, 'close')

  return x * y;
}

const day2Pt2 = async(file) => {
  let x = 0;
  let y = 0;
  let aim = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream(file)
  });

  rl.on('line', (line) => {
    let [dir, val] = line.split(' ');
    val = parseInt(val, 10);

    switch (dir) {
      case 'forward':
        x += val;
        y += aim * val;
        break;
      case 'down':
        aim += val;
        break;
      case 'up':
        aim -= val;
        break;
    }
  });

  await once(rl, 'close')

  return x * y;
}

day2Pt1('input.txt').then(console.log)
day2Pt2('input.txt').then(console.log)
