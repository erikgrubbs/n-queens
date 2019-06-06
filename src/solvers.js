/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var findSolution = function(row, n, board, callback, validator) {
  if (row === n) {
    return callback();
  }    
  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!validator()) {
      var result = findSolution(row + 1, n, board, callback, validator);
      if (result) {
        return result; // EJECT
      }
    } 
    board.togglePiece(row, i);
  }
};


window.findNRooksSolution = function(n) {
  var board = new Board({
    n: n
  });
  var solution = findSolution(0, n, board, function() {
    return board.rows().slice();
  }, board.hasAnyRooksConflicts.bind(board));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({
    n: n
  });
  var valid = board.hasAnyRooksConflicts.bind(board);
  findSolution(0, n, board, function() {
    solutionCount++;
  }, valid);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({
    n: n
  });
  var valid = board.hasAnyQueensConflicts.bind(board);
  var solution = findSolution(0, n, board, function() {
    return board.rows().slice();
  }, valid);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution ? solution : board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({
    n: n
  });
  var valid = board.hasAnyQueensConflicts.bind(board);

  findSolution(0, n, board, () => {
    solutionCount++;
  }, valid);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

/*
for when we understand bitwise
window.countNQueensSolutions = function(n) {
  recurse = function(n, ld, col, rd, solutionCount, poss, bit) {
    solutionCount = 0;
    if (!ld) {
      n = (1 << n) - 1;
    }
    poss = ~(ld | col | rd) & n;
    while (poss) {
      bit = -poss & poss;
      poss ^= bit;
      solutionCount += recurse(n, (ld | bit) << 1, col | bit, 
        (rd | bit) >> 1);
    }
    return solutionCount += col === n;
  };
  return recurse(n, 0, 0, 0);
};
*/