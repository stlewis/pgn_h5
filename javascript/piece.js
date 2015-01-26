var Piece = function(){
  return {
    // Properties
    name: 'piece',
    color: 'color',
    symbol: 'symbol',

   // Methods

   init: function(name, color){
      this.name   = name; 
      this.color  = color;
      this.symbol = this._setSymbol();
      return this;
   },
   
   possibleMoves: function(start_square){
     var starting_column = start_square.substring(0,1);
     var starting_rank   = start_square.substring(1);
    switch(this.name){
      case 'P':
        return this._movesForPawn(starting_column, starting_rank);
      break;
      case 'K':
        return this._movesForKing(starting_column, starting_rank);
      break;
      case 'Q':
        return this._movesForQueen(starting_column, starting_rank);
      break;
      case 'B':
        return this._movesForBishop(starting_column, starting_rank); 
      break;
      case 'N':
        return this._movesForKnight(starting_column, starting_rank);
      break;
      case 'R':
        return this._movesForRook(starting_column, starting_rank);
      break;
    }
   
   },

   _setSymbol:  function(){
      switch(this.name){
        case 'K': 
          return this.color == 'white' ? '\u2654' : '\u265A'
        break;
        case 'Q':
          return this.color == 'white' ? '\u2655' : '\u265B'
        break;
        case 'B':
          return this.color == 'white' ? '\u2657' : '\u265D'
        break;
        case 'N':
          return this.color == 'white' ? '\u2658' : '\u265E'
        break;
        case 'R':
          return this.color == 'white' ? '\u2656' : '\u265C'
        break;
        case 'P':
          return this.color == 'white' ? '\u2659' : '\u265F'
        break;
      }
   },

  // The movesFor methods return all the squares that are available to the piece given their current location, without regards for any other pieces on the board.
  // The board is responsible for filtering moves that are illegal due to the placement of other pieces.

  _movesForPawn: function(starting_column, starting_rank){
    // From any given location, a pawn is able to move 1 square forward, or one square in either diagonal direction. That the diagonal is only available in capture situations is 
    // something for the Board to work out. However, since the '2 square rule' is a positional one, it is enforced here, based upon the passed square and the pawns color.
    // This is the only method that really needs to be worried about color, as color determines what direction a pawn considers 'forward'
    
    var inc   = this.color == 'white' ? 'up' : 'down';
    var moves = [];

    var next_rank      = this._nextRank(starting_rank, inc);
    var following_rank = this._nextRank(next_rank, inc);
   
    // Always give them one step forward, provided the square exists
    if(next_rank) moves.push(starting_column + next_rank);

    // Give them two steps if it's their first move
    if((this.color == 'white' && starting_rank == '2') || (this.color == 'black' && starting_rank == '7')) moves.push(starting_column + following_rank)

   // Give them their capture moves
   right_capture = this._nextDiagonal(starting_column, starting_rank, 'right', inc)
   left_capture  = this._nextDiagonal(starting_column, starting_rank, 'left', inc)
   if(right_capture) moves.push(right_capture);
   if(left_capture) moves.push(left_capture);

   return moves;
  },

  _movesForKing: function(starting_column, starting_rank){
    // From any given location, a king is able to move one square in any direction. For the purpose of pieces capable of moving in any direction,
    // terms like 'up', 'down', 'left', and 'right' are made with reference to the perspective of White.
    var moves = [];

    var next_rank       = this._nextRank(starting_rank, 'up');
    var previous_rank   = this._nextRank(starting_rank, 'down');

    var left_column     = this._nextColumn(starting_column, 'left')
    var right_column    = this._nextColumn(starting_column, 'right')

    var diag_right_up   = this._nextDiagonal(starting_column, starting_rank, 'right', 'up');
    var diag_left_up    = this._nextDiagonal(starting_column, starting_rank, 'left', 'up');

    var diag_right_down = this._nextDiagonal(starting_column, starting_rank, 'right', 'down');
    var diag_left_down  = this._nextDiagonal(starting_column, starting_rank, 'left', 'down');

    if(next_rank)       moves.push(starting_column + next_rank);
    if(previous_rank)   moves.push(starting_column + previous_rank);
    if(left_column)     moves.push(left_column + starting_rank);
    if(right_column)    moves.push(right_column + starting_rank);
    if(diag_right_up)   moves.push(diag_right_up);
    if(diag_left_up)    moves.push(diag_left_up);
    if(diag_right_down) moves.push(diag_right_down);
    if(diag_left_down)  moves.push(diag_left_down);

    return moves;
  },

  _movesForQueen: function(starting_column, starting_rank){
    // NOTE We can derive the queen's moves by taking the combination of 
    // the bishop and the rook...
    var moves = this._movesForBishop(starting_column, starting_rank).concat(this._movesForRook(starting_column, starting_rank));
    return moves;
  },

  _movesForBishop: function(starting_column, starting_rank){
    // From any given location, a bishop is able to move diagonally any number of squares in any direction 

    var moves = [];
    
    // Diagonally up and right from their location
    var next_up_right = this._nextDiagonal(starting_column, starting_rank, 'right', 'up');

    while(next_up_right){
      var current_up_right = next_up_right
     
      moves.push(current_up_right);

      var column        = current_up_right.substring(0,1);
      var rank          = current_up_right.substring(1);
      var next_up_right = this._nextDiagonal(column, rank, 'right', 'up');
    }

    // Diagonally up and left from their location
    var next_up_left = this._nextDiagonal(starting_column, starting_rank, 'left', 'up');

    while(next_up_left){
      var current_up_left = next_up_left
     
      moves.push(current_up_left);

      var column       = current_up_left.substring(0,1);
      var rank         = current_up_left.substring(1);
      var next_up_left = this._nextDiagonal(column, rank, 'left', 'up');
    }

    // Diagonally down and right from their location
    var next_down_right = this._nextDiagonal(starting_column, starting_rank, 'right', 'down');

    while(next_down_right){
      var current_down_right = next_down_right; 
     
      moves.push(current_down_right);

      var column          = current_down_right.substring(0,1);
      var rank            = current_down_right.substring(1);
      var next_down_right = this._nextDiagonal(column, rank, 'right', 'down');
    }

    // Diagonally down and left from their location
    var next_down_left = this._nextDiagonal(starting_column, starting_rank, 'left', 'down');

    while(next_down_left){
      var current_down_left = next_down_left; 
     
      moves.push(current_down_left);

      var column          = current_down_left.substring(0,1);
      var rank            = current_down_left.substring(1);
      var next_down_left  = this._nextDiagonal(column, rank, 'left', 'down');
    }
    return moves;
  },


  _movesForKnight: function(starting_column, starting_rank){
    // Knights are able to move 1 or 2 spaces either up or down or 
    // side to side, followed by either 1 or two spaces along the 
    // opposite axis...If the first half of the move involves two spaces,
    // then the next must involve 1 and vice versa.
    var starting_rank = parseInt(starting_rank);
    var moves = [];
    // 1 up, 2 right
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) + 2);
    if(starting_rank + 1 <= 8 && column_at_index){
      moves.push(column_at_index + (starting_rank + 1))
    }

    // 1 up, 2 left
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) - 2);
    if(starting_rank + 1 <= 8 && column_at_index){
      moves.push(column_at_index + (starting_rank + 1))
    }
    // 2 up, 1 right
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) + 1);
    if(starting_rank + 2 <= 8 && column_at_index){
      moves.push(column_at_index + (starting_rank + 2))
    }
    // 2 up, 1 left
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) - 1);
    if(starting_rank + 2 <= 8 && column_at_index){
      moves.push(column_at_index + (starting_rank + 2))
    }
    // 1 down, 2 right
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) + 2);
    if(starting_rank - 1 >= 1 && column_at_index){
      moves.push(column_at_index + (starting_rank - 1))
    }
    // 1 down, 2 left
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) - 2);
    if(starting_rank - 1 >= 1 && column_at_index){
      moves.push(column_at_index + (starting_rank - 1))
    }
    // 2 down, 1 right
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) + 1);
    if(starting_rank - 2 >= 1 && column_at_index){
      moves.push(column_at_index + (starting_rank - 2))
    }
    // 2 down, 1 left
    var column_at_index = this._columnAtIndex(this._columnIndex(starting_column) - 1);
    if(starting_rank - 2 >= 1 && column_at_index){
      moves.push(column_at_index + (starting_rank - 2))
    }

    return moves;
  },

  _movesForRook: function(starting_column, starting_rank){
    // The rook is capable of moving horizontally or vertically
    // as many squares as they want.
    var moves = [];
    
    // Verticals
    var next_rank = this._nextRank(starting_rank, 'up');
    while(next_rank && next_rank <= 8){
      moves.push(starting_column + next_rank);
      next_rank = this._nextRank(next_rank, 'up');
    }

    var previous_rank = this._nextRank(starting_rank, 'down')
    while(previous_rank >= 1){
      moves.push(starting_column + previous_rank);
      var previous_rank = this._nextRank(previous_rank, 'down');
    }
    
    // Horizontals
    var next_column = this._nextColumn(starting_column, 'right')
    while(next_column){
      moves.push(next_column + starting_rank);
      var next_column = this._nextColumn(next_column, 'right');
    }

    var previous_column = this._nextColumn(starting_column, 'left')
    while(previous_column){
      moves.push(previous_column + starting_rank);
      var previous_column = this._nextColumn(previous_column, 'left');
    }
    return moves;
  },

  _columnIndex: function(column_letter){
    var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return columns.indexOf(column_letter);
  },

  _columnAtIndex: function(index){
    var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return columns[index];
  },
  
  _nextColumn: function(starting_column, direction){
    var current_column_index = this._columnIndex(starting_column);

    if(direction == 'left') return this._columnAtIndex(current_column_index - 1);
    if(direction == 'right') return this._columnAtIndex(current_column_index + 1);
    return null;
  },

  _nextRank: function(starting_rank, direction){
    var next = null;
    if(direction == 'up')   next = parseInt(starting_rank) + 1;
    if(direction == 'down') next = parseInt(starting_rank) - 1;

    if(next < 1 || next > 8) return null;
    return next;
  },

  _nextDiagonal: function(starting_column, starting_rank, x_direction, y_direction){
    // The next diagonal in any given x,y direction is calcuable by obtaining the next
    // column in the x direction with the next rank in the y direction.
    var next_column = this._nextColumn(starting_column, x_direction);
    var next_rank   = this._nextRank(starting_rank, y_direction);
    if(next_column && next_rank){
      return next_column + next_rank;
    }
    return null;
  },
  
  }
}
