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
  var solution;
  var rooksSoFar = 0;
  var board = new Board({n: n});

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      } else {
        rooksSoFar++;

        if (rooksSoFar === n) {
          solution = board.rows();
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var startBoard = new Board({n: n});

  var nRooksRecurse = function(board, i) {
    // For each space on the i-th row...
    for (var j = 0; j < n; j++) {

      // If the space is not occupied...
      if (board.get(i)[j] === 0) {

        // Place a piece on the space.
        board.togglePiece(i, j);

        if ( board.hasAnyRooksConflicts() ) {

          // If the new piece causes a conflict, take it back
          // and do nothing.
          board.togglePiece(i, j);

        } else if ( board._numPieces() === n ){

          // Else if the new piece completes the board,
          // increment solutionCount.
          solutionCount++;
          board.togglePiece(i, j);

        } else {

          // Else, we recurse on a new board that includes
          // this new piece, starting the process again.
          nRooksRecurse( board, i + 1);
          board.togglePiece(i, j);
        }
      }
    }
  };

  nRooksRecurse(startBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var permutations = permutate(n);
  var solution;
  var board = new Board({n : n});
  var solutionBoard = new Board({n : n});
  solution = solutionBoard.rows();

  for (var p = 0; p < permutations.length; p++) {
    var current = permutations[p];
    var rowIndex = 0;
    for (var j = 0; j < n; j++) {
      board.togglePiece(rowIndex, current[j]);
      rowIndex++;
    }
    if (!board.hasAnyQueensConflicts()) {
      solution = board.rows();
      return solution;
    }
    board = new Board({n : n});
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var startBoard = new Board({n: n});

  var nQueensRecurse = function(board, i) {
    // For each space on the i-th row...
    for (var j = 0; j < n; j++) {
      // Place a piece on the space.
      board.togglePiece(i, j);

      // If the new piece does not cause any conflicts...
      if ( !board.hasAnyQueensConflicts() ) {
        // If the new piece completes the board,
        // increment solutionCount.
        if ( board._numPieces() === n ){
          solutionCount++;
        } else {
          // Else, we recurse on a new board that includes
          // this new piece, starting the process again.
          nQueensRecurse( board, i + 1 );
        }
      }
      
      // Take the piece back in order to test a
      // different space within the row.
      board.togglePiece(i, j);
    }
  };

  // A 0x0 board has one solution according to HR
  if (n === 0) {
    return 1;
  } 

  // Begin the recursion process
  nQueensRecurse(startBoard, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.permutate = function(n) {
  var range = _.range(n);

  var outcomes = [];
  var playedSoFar = [];

  var combos = function(roundsToGo) {
    if (roundsToGo === 0) {
      outcomes.push(playedSoFar.slice(0));
      return;
    }

    for (var i = 0; i < range.length; i++) {
      var temp = range[i];
      playedSoFar.push(temp);
      range.splice(i, 1);
      combos(roundsToGo - 1);
      range.splice(i, 0, temp);
      playedSoFar.pop();
    }
    return;
  }

  combos(n);
  return outcomes;
};