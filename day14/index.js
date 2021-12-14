const fs = require('fs')

const parseInput = (file) => {
  const data = fs.readFileSync(file, 'utf-8')
  return data.split('\n\n')
}

const parseInsertionRules = (data) => {
  return data
    .split('\n')
    .map(row => row.trim().split(' -> '))
    .reduce((acc, [a, b]) => {
      acc[a] = b
      return acc
    }, {})
}

const applyPairInsertion = (template, rules, steps) => {
  let currTemplate = template
  let currSteppedTemplate = ''

  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < currTemplate.length; j++) {
      const pair = currTemplate[j] + currTemplate[j + 1] || ''

      currSteppedTemplate += currTemplate[j]

      if (rules[pair]) {
        currSteppedTemplate += rules[pair]
      }
    }

    currTemplate = currSteppedTemplate
    currSteppedTemplate = ''
  }

  return currTemplate
}

const getElementScore = (polymer) => {
  const countMap = {}

  for (let i = 0; i < polymer.length; i++) {
    const curr = polymer[i]

    countMap[curr] = (countMap[curr] || 0) + 1
  }

  let max = 0
  let min = Infinity

  Object.keys(countMap).forEach(k => {
    const curr = countMap[k]

    max = Math.max(curr, max)
    min = Math.min(curr, min)
  })

  return max - min
}

const day14Pt1 = (steps) => {
  const [template, insertionRules] = parseInput('./sample.txt')
  const rulesMap = parseInsertionRules(insertionRules)
  const polymer = applyPairInsertion(template, rulesMap, steps)
  return getElementScore(polymer)
}

const day14Pt2 = (steps) => {
  const pairCounts = {}
  const [template, insertionRules] = parseInput('./sample.txt')
  const rulesMap = parseInsertionRules(insertionRules)

  for ()
}

console.log(day14Pt1(40))
