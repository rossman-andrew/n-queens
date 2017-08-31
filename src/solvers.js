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

/*
  TIME COMPLEXITY OF SOLVER FUNCTIONS
  
  findNRooksSolution -- O(n) : linear
  countNRooksSolutions -- O(n) : linear
  findNQueensSolution -- O(n^2) : quadratic
  countNQueensSolutions -- O(n^2) : quadratic

*/

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var fact = (n) => {
    if (n === 1) {
      return 1;
    } else {
      return n * fact(n - 1);
    }
  };
  
  solutionCount = fact(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({'n': n});
  
  var recursiveFindSolution = (currCol) => {
    if (currCol === n) {
      return true;
    } else {
      for (var i = 0; i < n; i++) {
        if (!solution.hasAnyQueenConflictsOn(i, currCol)) {
          solution.togglePiece(i, currCol);
          if (!recursiveFindSolution(currCol + 1)) {
            solution.togglePiece(i, currCol);
          } else {
            return true;
          }
        }
      }
    }
    return false;
  };
  
  recursiveFindSolution(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({'n': n});
  
  var recursiveFindSolution = (currCol) => {
    if (currCol === n) {
      solutionCount += 1;
      return false;
    } else {
      for (var i = 0; i < n; i++) {
        if (!solution.hasAnyQueenConflictsOn(i, currCol)) {
          solution.togglePiece(i, currCol);
          if (!recursiveFindSolution(currCol + 1)) {
            solution.togglePiece(i, currCol);
          }
        }
      }
    }
    return false;
  };
  
  recursiveFindSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
