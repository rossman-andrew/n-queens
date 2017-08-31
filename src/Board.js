// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right - Y
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt(rowIndex) {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.get(rowIndex)[i] === 1) {
          return true;
        }
      }

      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts() {
      var counter = 0;
      for (var row = 0; row < this.get('n'); row++) {
        //Searching through rows
        for (var col = 0; col < this.get('n'); col++) {
          //search through columns in rows
          if (this.get(row)[col] === 1) {
            counter++;
          }
        }
        if (counter > 1) {
          return true;
        } else {
          counter = 0;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom - X
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt(colIndex) {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.get(i)[colIndex] === 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts() {
      var counter = 0;
      for (var col = 0; col < this.get('n'); col++) {
        //Searching through rows
        for (var row = 0; row < this.get('n'); row++) {
          //search through columns in rows
          if (this.get(row)[col] === 1) {
            counter++;
          }
        }
        if (counter > 1) {
          return true;
        } else {
          counter = 0;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt(index) {
      var currRow = 0;
      var currCol = index;
      var objsFound = 0;
      
      while (currRow < this.get('n') && currCol < this.get('n')) {
        if (this.get(currRow)[currCol] === 1) {
          // objsFound++;
          // if (objsFound >= 2) {
          //   return true;
          // }
          return true;
        }
        currRow++;
        currCol++;
      }
 
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts() {
      //There will be n - 3 diagonals to check
      // debugger;
      //First-row index: passing in a col index
      for (var i = -(this.get('n') - 2); i < this.get('n') - 1; i++) {
        var currRow = 0;
        var currCol = i;
        var objsFound = 0;
        
        while (currRow < this.get('n') && currCol < this.get('n')) {
          if (this.get(currRow)[currCol] === 1) {
            objsFound++;
            if (objsFound > 1) {
              return true;
            }
          }
          currRow++;
          currCol++;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt(index) {
      var currRow = 0;
      var currCol = index;
      
      while (currRow < this.get('n') && currCol >= 0) {
        if (this.get(currRow)[currCol] === 1) {
          return true;
        }
        currRow++;
        currCol--;
      }
 
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts() {
      for (var i = this.get('n') + 1; i > 0; i--) {
        // if (this.hasMinorDiagonalConflictAt(i)) {
        //   return true;
        // }
        var currRow = 0;
        var currCol = i;
        var objsFound = 0;
        while (currRow < this.get('n') && currCol >= 0) {
          if (this.get(currRow)[currCol] === 1) {
            objsFound++;
            if (objsFound > 1) {
              return true;
            }
          }
          currRow++;
          currCol--;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = (n) => {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
