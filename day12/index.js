const fs = require('fs')

function Edge (val) {
  this.val = val
  this.isLowerCase = false
  this.isUpperCase = false
  this.isStart = false
  this.isEnd = false

  this.init = () => {
    this.setIsStart()
    this.setIsEnd()
    this.setIsLowerCase()
    this.setIsUpperCase()
  }

  this.setIsLowerCase = () => {
    this.isLowerCase =
      !this.isStart &&
      !this.isEnd &&
      this.val === this.val.toLowerCase()
  }

  this.setIsUpperCase = () => {
    this.isUpperCase = this.val === this.val.toUpperCase()
  }

  this.setIsEnd = () => {
    this.isEnd = this.val === 'end'
  }

  this.setIsStart = () => {
    this.isStart = this.val === 'start'
  }
}

const parseEdges = (file) => {
  const data = fs.readFileSync(file, 'utf-8')
  return data.split('\n').map(row => row.trim().split('-'))
}

const connectEdges = (points) => {
  const out = {}

  points.forEach(([a, b]) => {
    if (!out[a]) {
      out[a] = []
    }

    const edge = new Edge(b)
    edge.init()

    out[a].push(edge)

    if (!out[b]) {
      out[b] = []
    }

    const edge2 = new Edge(a)
    edge2.init()
    out[b].push(edge2)
  })

  return out
}

const dfs = (graph, curr, visited) => {
  if (curr.isEnd) {
    return 1
  }

  if (curr.isStart) {
    return 0
  }

  const edges = graph[curr.val]
  let total = 0

  if (curr.isLowerCase) {
    visited.add(curr.val)
  }

  edges.forEach(point => {
    if (!visited.has(point.val)) {
      total += dfs(graph, point, new Set(Array.from(visited)))
    }
  })

  return total
}

const dfs2 = (graph, curr, visited) => {
  const { isStart, isEnd, isLowerCase, val } = curr
  if (isEnd) {
    return 1
  } else if (isStart) {
    return 0
  }

  const edges = graph[val]
  let total = 0

  if (isLowerCase) {
    visited[val] = (visited[val] || 0) + 1
  }

  edges.forEach(point => {
    if (point.isStart || (visited[point.val] >= 1 && visited.visitedTwice)) {
      return
    }

    const visitedCopy = { ...visited }
    if (visitedCopy[point.val] === 1) {
      visitedCopy.visitedTwice = true
    }

    total += dfs2(graph, point, visitedCopy)
  })

  return total
}

const day12Pt1 = () => {
  const points = parseEdges('./input.txt')
  const graph = connectEdges(points)

  return dfs(graph, { val: 'start' }, new Set())
}

const day12Pt2 = () => {
  const points = parseEdges('./input.txt')
  const graph = connectEdges(points)
  return dfs2(graph, { val: 'start' }, {})
}

console.log(day12Pt1()) // 5254
console.log(day12Pt2()) //
