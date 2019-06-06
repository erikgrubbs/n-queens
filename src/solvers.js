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
  var solutionCount = 0;
  var board = new Board({
    n: n
  });
  if (n === 0 || n === 1) {
    return 1;
  }
  
  var finder = function(currentRow) {    
    if (currentRow === n) {
      solutionCount++;
      return;
    }    
    for (var i = 0; i < n; i++) {
      board.togglePiece(currentRow, i);
      if (!board.hasAnyRooksConflicts()) {
        finder(currentRow + 1);
      } 
      board.togglePiece(currentRow, i);
    }
  }
  
  finder(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({
    n: n
  });
  var solution = []
  var toggles = true
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  } else if (n === 2 || n === 3) {
    return board.rows();
  }

  var finder = function(currentRow) {    
    if (currentRow === n) {
      solution = board.rows();
      console.log('working solution :', solution)
      toggles = false;
      return;
    }    
    for (var i = 0; i < n; i++) {
      if (!toggles) {
        break;
      }
      board.togglePiece(currentRow, i);      
      if (!board.hasAnyQueensConflicts()) {
       finder(currentRow + 1);
      }
      if (!toggles) {
        break;
      }
      board.togglePiece(currentRow, i);
    }
  }
  finder(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    var solutionCount = 0;
  var board = new Board({
    n: n
  });
  if (n === 0 || n === 1) {
    return 1;
  }
  
  var finder = function(currentRow) {    
    if (currentRow === n) {
      solutionCount++;
      return;
    }    
    for (var i = 0; i < n; i++) {
      board.togglePiece(currentRow, i);
      if (!board.hasAnyQueensConflicts()) {
        finder(currentRow + 1);
      } 
      board.togglePiece(currentRow, i);
    }
  }
  finder(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

