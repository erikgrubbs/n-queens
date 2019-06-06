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



window.findNRooksSolution = function(n) {
  var solution = [];
  var board = new Board({
    n: n
  });
  var piecesOnBoard = 0;
  if (n === 0) {
    return solution;
  } else if (n === 1) {
    return [[1]];
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (!board.rows()[i][j]) {
        board.togglePiece(i, j);
        piecesOnBoard++;
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(i, j);
          piecesOnBoard--;
        } else if (piecesOnBoard === n) {
          solution = board.rows();
        }
      } 
    } 
  }
  //checks for conflicts 
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0;
  // var board = new Board({
  //   n: n
  // });
  // if (n === 0 || n === 1) {
  //   return 1;
  // }
  
  
  /*
  var condition = board.get(0)
  while(condition)
  
  
  
  // 
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRookConflicts) {
        board.togglePiece(i, j);
      } else if (i === n - 1) {
        solutionCount++;
        board.togglePiece(i,j);
      }
    }
  }
  
  
  */
  // var finder = function(currentRow) {
  //   currentRow = currentRow || 0;    
  //   for (var i = currentRow; i < n; i++) {
  //     board.togglePiece(currentRow,i);
  //     if (board.hasAnyRooksConflicts()) {
  //       board.togglePiece(currentRow,i);
  //     } else {
  //       if (currentRow === n) {
  //         solutionCount++;
  //         board.togglePiece(currentRow,i);
  //         return;
  //       }
  //       finder(currentRow + 1);
  //     }
  //   }
    
  // }
  // finder();
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  
  var solutionCount = 0;
  var lastPlaced = [0, 0];
  var board = new Board({
    n: n
  });
  board.pieces = 0;
  if (n === 0 || n === 1) {
    return 1;
  }
  var findSolution = function(board, lastPlaced) {
    for (var i = lastPlaced[0]; i < n; i++) {
      for (var j = lastPlaced[1]; j < n; j++) {
        if (!board.rows()[i][j]) {
          board.togglePiece(i, j);
          board.pieces++;
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(i, j);
            board.pieces--;
          } else if(board.pieces < n) {
            lastPlaced = [i, j];
          } else if (board.pieces === n) {
            solutionCount++;
            board.togglePiece(i, j);
            board.pieces--;
            board.togglePiece(lastPlaced[0], lastPlaced[1]);
            board.pieces--;
            lastPlaced[1] = lastPlaced[1] + 1
            if(lastPlaced[1] >= n) {
              lastPlaced[1] = 0
              lastPlaced[0] = lastPlaced[0] + 1
            }
            board.togglePiece(lastPlaced[0], lastPlaced[1])
            board.pieces++;
            findSolution(board, [0,0])
          }
        }
      }
    }
  };
  findSolution(board, lastPlaced);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
