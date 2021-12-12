const checkInBounds = (grid, r, c) => {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length
}

const getAdjacentDirs = (grid, visited, r, c, includeDiagonal) => {
  let dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  if (includeDiagonal) {
    dirs = dirs.concat([
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ])
  }

  const out = []

  dirs.forEach(([dX, dY]) => {
    const nR = r + dX
    const nC = c + dY

    if (checkInBounds(grid, nR, nC) && !visited[nR][nC]) {
      out.push([nR, nC])
    }
  })

  return out
}

module.exports = {
  checkInBounds,
  getAdjacentDirs
}
