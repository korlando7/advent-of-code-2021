const { parseCsvInts } = require('../utils/parser')

const data = parseCsvInts('./input.txt')

const day7Pt1 = () => {
  const lo = Math.min(...data)
  const hi = Math.max(...data)

  let minFuel = Infinity

  for (let i = lo; i <= hi; i++) {
    let currFuel = 0
    for (let j = 0; j < data.length; j++) {
      currFuel += Math.abs(data[j] - i)
    }
    minFuel = Math.min(currFuel, minFuel)
  }

  return minFuel
}

const day7Pt2 = () => {
  const lo = Math.min(...data)
  const hi = Math.max(...data)

  let minFuel = Infinity

  const fuelCosts = [0]
  for (let i = 1; i <= hi; i++) {
    fuelCosts[i] = fuelCosts[i - 1] + i
  }

  for (let i = lo; i <= hi; i++) {
    let currFuel = 0
    for (let j = 0; j < data.length; j++) {
      currFuel += fuelCosts[Math.abs(data[j] - i)]
    }
    minFuel = Math.min(currFuel, minFuel)
  }

  return minFuel
}

console.log(day7Pt1())
console.log(day7Pt2())
