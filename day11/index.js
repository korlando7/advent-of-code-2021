const { parseNumberGrid } = require('../utils/parser')
const { getAdjacentDirs } = require('../utils/grid')

const getEmptyBoolGrid = (l, w) => {
  const out = []
  for (let i = 0; i < l; i++) {
    out.push(new Array(w).fill(false))
  }

  return out
}

const dfs = (grid, visited, r, c) => {
  if (visited[r][c]) {
    return 0
  } else if (grid[r][c] === 9) {
    grid[r][c] = 0
    visited[r][c] = true
  } else {
    grid[r][c]++
    return 0
  }

  let totalFlashes = 0

  const dirs = getAdjacentDirs(grid, visited, r, c, true)
  dirs.forEach(([nR, nC]) => {
    totalFlashes += dfs(grid, visited, nR, nC)
  })

  return totalFlashes + 1
}

const day11Pt1 = (days) => {
  const grid = parseNumberGrid('./input.txt')

  let totalFlashes = 0

  for (let i = 0; i < days; i++) {
    const visited = getEmptyBoolGrid(grid.length, grid[0].length)

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        totalFlashes += dfs(grid, visited, r, c)
      }
    }

    let isSync = true
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] !== 0) {
          isSync = false
        }
      }
    }

    if (isSync) {
      return i + 1
    }
  }

  return totalFlashes
}

console.log(day11Pt1(1000))
