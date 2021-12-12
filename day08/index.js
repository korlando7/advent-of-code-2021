const fs = require('fs')

const file = './input.txt'

const parseOutputs = (file) => {
  return fs.readFileSync(file, 'utf-8')
    .split('\n')
    .map(row => row.split(' | ')[1])
    .map(outputs => outputs.split(' '))
}

const parseSignals = (file) => {
  return fs.readFileSync(file, 'utf-8')
    .split('\n')
    .map(row => row.split(' | ')[0])
    .map(outputs => outputs.split(' '))
}

const getSignalMappings = (outputs) => {
  const mappings = {}

  outputs.forEach(output => {
    const len = output.length

    if (len === 2) {
      mappings[1] = output.split('')
    } else if (len === 4) {
      mappings[4] = output.split('')
    } else if (len === 3) {
      mappings[7] = output.split('')
    } else if (len === 7) {
      mappings[8] = output.split('')
    }
  })

  const oneSet = new Set(mappings[1])
  mappings.topLeftMiddle = mappings[4].filter(c => !oneSet.has(c))
  mappings.top = mappings[7].filter(c => !oneSet.has(c))

  return mappings
}

const decipherSignal = (output, mappings) => {
  const len = output.length
  let letterSet
  const { topLeftMiddle } = mappings

  switch (len) {
    case 2:
      return '1'
    case 4:
      return '4'
    case 3:
      return '7'
    case 7:
      return '8'
    case 5:
      // 2 3 5
      letterSet = new Set(output.split(''))
      if (mappings[1].every(c => letterSet.has(c))) {
        return '3'
      } else if (topLeftMiddle.every(c => letterSet.has(c))) {
        return '5'
      }
      return '2'
    case 6:
      // 0 6 9
      letterSet = new Set(output.split(''))
      if (!letterSet.has(topLeftMiddle[0]) || !letterSet.has(topLeftMiddle[1])) {
        return '0'
      } else if (mappings[4].every(c => letterSet.has(c))) {
        return '9'
      }
      return '6'
    default:
      return ''
  }
}

const day8Pt1 = () => {
  const outputs = parseOutputs(file).reduce((acc, curr) => {
    return acc.concat(curr)
  }, [])

  const uniqueSegments = new Set([2, 3, 4, 7])

  return outputs
    .filter(output => uniqueSegments.has(output.length))
    .length
}

const day8Pt2 = () => {
  const outputs = parseOutputs(file)
  const signals = parseSignals(file)
  let total = 0

  for (let i = 0; i < outputs.length; i++) {
    let numStr = ''
    const output = outputs[i]
    const signal = signals[i]
    const mappings = getSignalMappings(signal)
    for (let j = 0; j < output.length; j++) {
      numStr += decipherSignal(output[j], mappings)
    }

    total += parseInt(numStr, 10)
  }
  return total
}

console.log(day8Pt1())
console.log(day8Pt2())
