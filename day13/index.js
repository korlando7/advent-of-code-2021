const fs = require('fs')

const parseInput = (file) => {
  const data = fs.readFileSync(file, 'utf-8')
  return data.split('\n\n').map(d => d.split('\n'))
}

const getCoords = (data) => {
  return data
    .map(row => row.trim().split(',').map(p => parseInt(p, 10)))
}

const getFolds = (foldData) => {
  return foldData
    .map(fold =>
      fold
        .match(/(x|y)=\d+/)[0]
        .split('=')
        .map(n => isNaN(n)
          ? n
          : parseInt(n)
        )
    )
}

const removeInvalidCoords = (coords) => {
  const found = new Set([])

  return coords.filter(([x, y]) => {
    if (x < 0 || y < 0) {
      return false
    }
    const key = `${x},${y}`
    if (found.has(key)) {
      return false
    }
    found.add(key)
    return true
  })
}

const getFoldedCoords = (coords, folds) => {
  if (!folds.length) {
    return
  }

  folds.forEach(([axis, pos]) => {
    coords.forEach(([x, y], idx) => {
      if ((axis === 'y' && pos > y) ||
          (axis === 'x' && pos > x)) {
        return
      }

      const ref = axis === 'x' ? x : y
      const col = axis === 'x' ? 0 : 1
      const dist = ref - pos
      coords[idx][col] = pos - dist
    })
  })
}

const getDisplayCoords = (coords) => {
  const width = Math.max(...coords.map(c => c[0]))
  const height = Math.max(...coords.map(c => c[1]))

  const display = []

  for (let i = 0; i < height + 1; i++) {
    display[i] = new Array(width + 1).fill('.')
  }

  coords.forEach(([x, y]) => {
    display[y][x] = '#'
  })

  return display.map(row => row.join(''))
}

const day13Pt1 = () => {
  const [coordData, foldData] = parseInput('./input.txt')
  const coords = getCoords(coordData)
  const folds = getFolds(foldData)
  getFoldedCoords(coords, [folds[0]])
  return removeInvalidCoords(coords).length
}

const day13Pt2 = () => {
  const [coordData, foldData] = parseInput('./input.txt')
  const coords = getCoords(coordData)
  const folds = getFolds(foldData)
  getFoldedCoords(coords, folds)
  return getDisplayCoords(removeInvalidCoords(coords))
}

console.log(day13Pt1()) // 810
console.log(day13Pt2()) // HLBUBGFR
