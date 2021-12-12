const { parseRows } = require('../utils/parser')

const data = parseRows('./input.txt')

const multiplyBinaries = (nums) => {
  return nums.reduce((acc, curr) => {
    return acc * parseInt(curr, 2)
  }, 1)
}

const getMostCommonBits = (nums, startingIdx = 0, endingIdx) => {
  const res = []

  const bits = endingIdx === undefined ? nums[0].length : endingIdx
  const len = nums.length

  for (let i = startingIdx; i < bits; i++) {
    const counts = [0, 0]
    for (let j = 0; j < len; j++) {
      const curr = nums[j][i]
      counts[curr]++
    }
    const [zeroes, ones] = counts
    res.push(ones >= zeroes ? 1 : 0)
  }

  return res
}

const day3Pt1 = () => {
  const commonBits = getMostCommonBits(data)
  const gamma = commonBits.join('')
  const epsilon = commonBits.map(bit => bit ^ 1).join('')

  return multiplyBinaries([gamma, epsilon])
}

const day3Pt2 = () => {
  const getRating = (nums, idx, isCommon) => {
    if (!nums.length) {
      return 0
    } else if (nums.length === 1 || idx >= nums[0].length) {
      return nums[0]
    }

    const [commonBit] = getMostCommonBits(nums, idx, idx + 1)
    const bitMatch = isCommon ? commonBit : commonBit ^ 1

    const ratings = nums.filter(n => {
      return n[idx] === bitMatch
    })

    return getRating(ratings, idx + 1, isCommon)
  }

  const o2Rating = getRating(data, 0, true)
  const co2Rating = getRating(data, 0, false)
  return multiplyBinaries([o2Rating, co2Rating])
}

console.log(day3Pt1())
console.log(day3Pt2())
