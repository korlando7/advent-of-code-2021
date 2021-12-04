const fs = require('fs');

const data = fs.readFileSync('./sample.txt', 'utf-8');

const rows = data.split('\n\n').map(row => row.trim());
const [numbers, ...boards] = rows;

const getInitialBoardStates = (boards) => {
  const boardStates = [];
  boards.forEach(board => {
    const boardState = { sum: 0, map: {}, marked: { rows: {}, cols: {} } };
    const parsed = board
      .split('\n')
      .map(row => row
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
      );
    const rows = parsed.length;
    const cols = parsed[0].length;

    boardState.rows = rows;
    boardState.cols = cols;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = parseInt(parsed[r][c], 10);
        boardState.sum += val
        boardState.map[val] = [r, c];
      }
    }
    boardStates.push(boardState);
  });

  return boardStates;
}

const markAndVerifyWinning = (boardState, r, c) => {
  const { marked } = boardState;
  marked.rows[r] = (marked.rows[r] || 0) + 1;
  marked.cols[c] = (marked.cols[c] || 0) + 1;
  return marked.rows[r] == boardState.rows || marked.cols[c] == boardState.cols;
}

const findWinningBoards = (winningPosition, ignoreCompleted) => {
  const boardStates = getInitialBoardStates(boards);
  let latestNum;
  let winningSum = 0;
  const parsedNums = numbers.trim().split(',');
  let i = 0;
  let totalCompleted = 0;
  if (!winningPosition) {
    winningPosition = boardStates.length;
  }

  while (i < parsedNums.length && winningPosition > totalCompleted) {
    let j = 0;
    let num = parsedNums[i];
    while (j < boardStates.length && winningPosition > totalCompleted) {
      const boardState = boardStates[j];
      const { map } = boardState;
      if ((!ignoreCompleted || !boardState.completed) && num in map) {
        const [r, c] = map[num];
        const intNum = parseInt(num, 10);
        boardState.sum -= intNum;
  
        if (markAndVerifyWinning(boardState, r, c)) {
          latestNum = intNum;
          winningSum = boardState.sum;
          boardState.completed = true;
          totalCompleted++
        }
      }

      j++
    }
    i++
  }
  return winningSum * latestNum;
}


const day4Pt1 = () => {
  return findWinningBoards(1);
}

const day4Pt2 = () => {
  return findWinningBoards(null, true);
}

console.log(day4Pt1()); // 41503
console.log(day4Pt2()); // 3178