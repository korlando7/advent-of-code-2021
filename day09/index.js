const { parseNumberGrid } = require('../utils/parser')
const { checkInBounds } = require('../utils/grid')

const getAdjHeights = (grid, r, c, visited, omitMax) => {
  const coords = []
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  dirs.forEach(dir => {
    const [dX, dY] = dir
    const nextR = r + dX
    const nextC = c + dY

    if (checkInBounds(grid, nextR, nextC) &&
            (!visited || (visited && !visited[nextR][nextC])) &&
            (!omitMax || (omitMax && grid[nextR][nextC] !== 9))) {
      coords.push([nextR, nextC])
    }
  })

  return coords
}

const getLowPointCoords = (grid) => {
  const rows = grid.length
  const cols = grid[0].length
  const coords = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const adjHeights = getAdjHeights(grid, r, c).map(([nR, nC]) => grid[nR][nC])
      if (grid[r][c] < Math.min(...adjHeights)) {
        coords.push([r, c])
      }
    }
  }

  return coords
}

const findBasinsDFS = (grid, visited, r, c) => {
  if (visited[r][c]) {
    return 0
  }
  visited[r][c] = true

  const adjHeights = getAdjHeights(grid, r, c, visited, true)

  let total = 1

  adjHeights.forEach(([nR, nC]) => {
    total += findBasinsDFS(grid, visited, nR, nC)
  })

  return total
}
const day9Pt1 = () => {
  const grid = parseNumberGrid('./input.txt')
  const lowPoints = getLowPointCoords(grid)

  return lowPoints
    .map(([r, c]) => grid[r][c] + 1)
    .reduce((acc, curr) => acc + curr, 0)
}

const day9Pt2 = () => {
  const grid = parseNumberGrid('./input.txt')
  const visited = []

  for (let r = 0; r < grid.length; r++) {
    visited[r] = new Array(grid[r].length).fill(false)
  }

  const lowPoints = getLowPointCoords(grid)
  const basinSizes = []

  lowPoints.forEach(([r, c]) => {
    const basinSize = findBasinsDFS(grid, visited, r, c)
    basinSizes.push(basinSize)
  })

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc * curr, 1)
}

console.log(day9Pt1())
console.log(day9Pt2())
