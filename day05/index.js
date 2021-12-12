const { parseRows } = require('../utils/parser')

const addLineCoords = (coords, x1, y1, x2, y2) => {
  let slope = x1 === x2 ? undefined : 0
  const noSlope = slope === undefined

  x1 = parseInt(x1, 10)
  x2 = parseInt(x2, 10)
  y1 = parseInt(y1, 10)
  y2 = parseInt(y2, 10)

  if (!noSlope) {
    if (x1 > x2) {
      x1 = x1 + x2
      x2 = x1 - x2
      x1 = x1 - x2

      y1 = y1 + y2
      y2 = y1 - y2
      y1 = y1 - y2
    }

    slope = (y2 - y1) / (x2 - x1)
  }

  const b = y1 - (x1 * slope)
  const start = noSlope
    ? Math.min(y1, y2)
    : x1
  const end = noSlope
    ? Math.max(y1, y2)
    : x2

  for (let i = start; i <= end; i++) {
    const y = slope * i + b
    const nextX = noSlope ? x1 : i
    const nextY = noSlope ? i : y

    coords.push(`${nextX},${nextY}`)
  }
}

const parseCoordinates = (omitDiagonals) => {
  const dataRows = parseRows('./input.txt')
  const coords = []

  dataRows.forEach(row => {
    const [p1, p2] = row.split(' -> ')

    const [x1, y1] = p1.split(',')
    const [x2, y2] = p2.split(',')

    // get only horizontal and vertical lines
    if (!omitDiagonals || y2 === y1 || x2 === x1) {
      addLineCoords(coords, x1, y1, x2, y2)
    }
  })

  return coords
}

const getOverlaps = (omitDiagonals) => {
  const coords = parseCoordinates(omitDiagonals).sort()
  const counts = {}
  let overlaps = 0

  coords.forEach(coord => {
    counts[coord] = (counts[coord] || 0) + 1

    if (counts[coord] === 2) {
      overlaps++
    }
  })

  return overlaps
}

const day5Pt1 = () => {
  return getOverlaps(true)
}

const day5Pt2 = () => {
  return getOverlaps(false)
}

console.log(day5Pt1()) // 5169
console.log(day5Pt2()) // 22083
