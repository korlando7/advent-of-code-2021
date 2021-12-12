
const { parseRows } = require('../utils/parser')

const bracketMap = {
  '{': '}',
  '(': ')',
  '[': ']',
  '<': '>'
}

const bracketPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const autoCompletePoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

const findSyntaxErrorOrCompleteLine = (line) => {
  const stack = []

  for (let i = 0; i < line.length; i++) {
    const curr = line[i]

    if (curr in bracketMap) {
      stack.push(curr)
    } else {
      const prev = stack.pop()
      if (bracketMap[prev] !== curr) {
        return {
          score: bracketPoints[curr],
          completed: null
        }
      }
    }
  }

  let total = 0

  for (let i = stack.length - 1; i >= 0; i--) {
    total *= 5
    const val = bracketMap[stack[i]]
    total += autoCompletePoints[val]
    line += val
  }

  return {
    score: total,
    completed: line
  }
}

const day10Pt1 = () => {
  const rows = parseRows('./input.txt')

  return rows
    .map(row => !row.completed ? findSyntaxErrorOrCompleteLine(row).score : 0)
    .reduce((acc, curr) => acc + curr, 0)
}

const day10Pt2 = () => {
  const rows = parseRows('./input.txt')

  const scores = []

  rows.forEach(row => {
    const { score, completed } = findSyntaxErrorOrCompleteLine(row)
    if (completed) {
      scores.push(score)
    }
  })

  scores.sort((a, b) => a - b)
  return scores[Math.floor(scores.length / 2)]
}

console.log(day10Pt1()) // 392043
console.log(day10Pt2())
