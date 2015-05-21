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
  var board = new Board({n : n});

  var nRooksRecurse = function(solCountSofar, numRooks, rowIndex, colIndex) {
     // else {
      if (!board.get(rowIndex)[colIndex]) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasAnyRooksConflicts()) {
          numRooks++;
          if (numRooks === n) {
            solutionCount++;// = solCountSofar + 1;
            return;
          }

          for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
              if (!(i === rowIndex && j === colIndex)) {
                nRooksRecurse(solCountSofar, numRooks, i, j);
              }
            }
          }
        } else {
          board.togglePiece(rowIndex, colIndex);
        }
      }
    // }
  };
  nRooksRecurse(solutionCount, 0, 0, 0);
  // Attempt to find a solution using findNRooksSolution
    // If a valid solution is found,
      // Increment solutionCount
      // Loop back, and try to find more solutions
    // If no solution is found,



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;
//   var board = new Board({n : n});
//   var permutations = 
//
//   var nRooksRecurse = function(solCountSofar, numRooks, rowIndex, colIndex) {
//      // else {
//       if (!board.get(rowIndex)[colIndex]) {
//         board.togglePiece(rowIndex, colIndex);
//         if (!board.hasAnyRooksConflicts()) {
//           numRooks++;
//           if (numRooks === n) {
//             solutionCount++;// = solCountSofar + 1;
//             return;
//           }

//           for (var i = 0; i < n; i++) {
//             for (var j = 0; j < n; j++) {
//               if (!(i === rowIndex && j === colIndex)) {
//                 nRooksRecurse(solCountSofar, numRooks, i, j);
//               }
//             }
//           }
//         } else {
//           board.togglePiece(rowIndex, colIndex);
//         }
//       }
//     // }
//   };
//   nRooksRecurse(solutionCount, 0, 0, 0);
//   // Attempt to find a solution using findNRooksSolution
//     // If a valid solution is found,
//       // Increment solutionCount
//       // Loop back, and try to find more solutions
//     // If no solution is found,



//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };



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
