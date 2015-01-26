var chessBoard = function(){
  
  return {
  // Board properties              
  light_square: '#ffffff',
  dark_square:  '#d3d3d3',
  coordinate:   '#fff',
  border:       '#000',
  square_width: 100,
  board_width: function(){ return (this.square_width * 8) + 40; },
  piece_size: function(){ return this.square_width * .75; },

  white_king:   Piece().init('K', 'white'),
  white_queen:  Piece().init('Q', 'white'),
  white_bishop: Piece().init('B', 'white'),
  white_knight: Piece().init('N', 'white'),
  white_rook:   Piece().init('R', 'white'),
  white_pawn:   Piece().init('P', 'white'),

  black_king:   Piece().init('K', 'black'),
  black_queen:  Piece().init('Q', 'black'),
  black_bishop: Piece().init('B', 'black'),
  black_knight: Piece().init('N', 'black'),
  black_rook:   Piece().init('R', 'black'),
  black_pawn:   Piece().init('P', 'black'),
 
  // Define property objects for every board square. coord is the x,y position that a piece should be placed 
  // at for that square. name is the name of the square and piece is the charcode for the piece
  a1: {name: 'a1', piece: null},
  a2: {name: 'a2', piece: null},
  a3: {name: 'a3', piece: null},
  a4: {name: 'a4', piece: null},
  a5: {name: 'a5', piece: null},
  a6: {name: 'a6', piece: null},
  a7: {name: 'a7', piece: null},
  a8: {name: 'a8', piece: null},
  
  b1: {name: 'b1', piece: null},
  b2: {name: 'b2', piece: null},
  b3: {name: 'b3', piece: null},
  b4: {name: 'b4', piece: null},
  b5: {name: 'b5', piece: null},
  b6: {name: 'b6', piece: null},
  b7: {name: 'b7', piece: null},
  b8: {name: 'b8', piece: null},
  
  c1: {name: 'c1', piece: null},
  c2: {name: 'c2', piece: null},
  c3: {name: 'c3', piece: null},
  c4: {name: 'c4', piece: null},
  c5: {name: 'c5', piece: null},
  c6: {name: 'c6', piece: null},
  c7: {name: 'c7', piece: null},
  c8: {name: 'c8', piece: null},
  
  d1: {name: 'd1', piece: null},
  d2: {name: 'd2', piece: null},
  d3: {name: 'd3', piece: null},
  d4: {name: 'd4', piece: null},
  d5: {name: 'd5', piece: null},
  d6: {name: 'd6', piece: null},
  d7: {name: 'd7', piece: null},
  d8: {name: 'd8', piece: null},
  
  e1: {name: 'e1', piece: null},
  e2: {name: 'e2', piece: null},
  e3: {name: 'e3', piece: null},
  e4: {name: 'e4', piece: null},
  e5: {name: 'e5', piece: null},
  e6: {name: 'e6', piece: null},
  e7: {name: 'e7', piece: null},
  e8: {name: 'e8', piece: null},
  
  f1: {name: 'f1', piece: null},
  f2: {name: 'f2', piece: null},
  f3: {name: 'f3', piece: null},
  f4: {name: 'f4', piece: null},
  f5: {name: 'f5', piece: null},
  f6: {name: 'f6', piece: null},
  f7: {name: 'f7', piece: null},
  f8: {name: 'f8', piece: null},
 
  g1: {name: 'g1', piece: null},
  g2: {name: 'g2', piece: null},
  g3: {name: 'g3', piece: null},
  g4: {name: 'g4', piece: null},
  g5: {name: 'g5', piece: null},
  g6: {name: 'g6', piece: null},
  g7: {name: 'g7', piece: null},
  g8: {name: 'g8', piece: null},
  
  h1: {name: 'h1', piece: null},
  h2: {name: 'h2', piece: null},
  h3: {name: 'h3', piece: null},
  h4: {name: 'h4', piece: null},
  h5: {name: 'h5', piece: null},
  h6: {name: 'h6', piece: null},
  h7: {name: 'h7', piece: null},
  h8: {name: 'h8', piece: null},

  init: function(target_id){
    this.c   = document.getElementById(target_id);
    this.ctx = this.c.getContext('2d');
    return this;
  },
  
  draw: function(){
    // Size the canvas
    this.c.height = this.board_width();
    this.c.width  = this.board_width();

    
    // Draw the squares
    for(x = 0; x < 8; x++){
      if(x % 2 == 0){
        for(i = 0; i < 8; i++){
          this.ctx.fillStyle = (i % 2 == 0) ? this.light_square : this.dark_square;
          this.ctx.fillRect(x * this.square_width, i * this.square_width, this.square_width, this.square_width);
        }
      }else{
        for(i = 0; i < 8; i++){
          this.ctx.fillStyle = (i % 2 == 1) ? this.light_square : this.dark_square;
          this.ctx.fillRect(x * this.square_width, i * this.square_width, this.square_width, this.square_width);
        }
      }
    
    }

    // Label the board
    this.c.style.background = this.border;

    this.ctx.fillStyle = this.coordinate;
    this.ctx.font      = this.square_width/4 + "px Arial";
    
    x       = (this.square_width/2); 
    edge    = x + (this.square_width/2);
    y       = this.board_width() - 15;
    this.ctx.fillText('A', x, y)
    
    columns = Array('B', 'C', 'D', 'E', 'F', 'G', 'H');
    
    for(i = 0; i < 7; i++){
      letter = columns[i];
     
      x      = edge + (this.square_width/2);
      edge   = x + (this.square_width/2);
      y      = this.board_width() - 15;
      
      this.ctx.fillText(letter, x, y);
    }

    
    y     = (this.square_width/2);
    edge  = y + (this.square_width/2);
    x     = this.board_width() - 15;
    this.ctx.fillText(8, x, y);
    
    ranks = Array(7, 6, 5, 4, 3, 2, 1);
    for(i = 0; i < 7; i++){
      number = ranks[i];
      
      y      = edge + (this.square_width/2);
      edge   = y + (this.square_width/2);
      x      = this.board_width() - 15;
      
      this.ctx.fillText(number, x, y);
    }

        
  },

  calculateCoordinate: function(square_name){
    // Figure out ideal piece placement based upon square dimensions
    column = square_name.substring(0,1);
    rank   = square_name.substring(1);

    column_multiplers = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7};
    x = (this.square_width * .15) + (this.square_width * column_multiplers[column]);

    rank_multipliers = {'1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0};
    y = (this.square_width * .7) + (this.square_width * rank_multipliers[rank]);

    return [x, y];
  },
 
  squaresOccupiedBy: function(piece){
    squares = [];
    for(var propName in this){
      if(this[propName].hasOwnProperty('piece')) squares.push(this[propName]);
    }
    return squares.filter(function(square){ return square.piece == piece });
  },
  
  placePiece: function(piece, square){
    square.piece = piece;
    if(!this.ctx) return true;
    coord = this.calculateCoordinate(square.name);
    x     = coord[0];
    y     = coord[1];
   
    this.ctx.font =  this.piece_size()+"px Arial";
    this.ctx.fillStyle = '#000'
    this.ctx.fillText(piece.symbol, x, y);
    return piece;
  },

  movePiece: function(from, to, is_capture, promote_to){
    piece = promote_to ? promote_to : from.piece;

    if(is_capture) this.removePiece(to);
    this.removePiece(from);
    this.placePiece(piece, to);
  },
  
  removePiece: function(square){
    square.piece = null;
    var column = square.name.substring(0, 1);
    var rank   = parseInt(square.name.substring(1));

    var odd_blacks  = Array('a', 'c', 'e', 'g');
    var even_blacks = Array('b', 'd', 'f', 'h');
                        // If we're on an odd numbered rank and the column is in the odd_blacks list or if we're on an even numbered rank and the column is in the even_blacks list
    var is_black_square = (odd_blacks.indexOf(column) >= 0 && rank % 2 == 1) || (even_blacks.indexOf(column) >= 0 && rank % 2 == 0);
    
    if(is_black_square){
      this.ctx.fillStyle = this.dark_square;
    }else{
      this.ctx.fillStyle = this.light_square;
    } 

    coords = this.calculateCoordinate(square.name)
    x      = coords[0] - this.square_width/6.7;
    y      = coords[1] - this.square_width/1.43;

    this.ctx.fillRect(x, y, this.square_width, this.square_width);
  },

  set: function(){ // Set the initial piece placement for a game
    this.placePiece(this.white_king, this.e1);
    this.placePiece(this.white_queen, this.d1);

    this.placePiece(this.white_bishop, this.c1);
    this.placePiece(this.white_bishop, this.f1);

    this.placePiece(this.white_knight, this.b1);
    this.placePiece(this.white_knight, this.g1);

    this.placePiece(this.white_rook, this.a1);
    this.placePiece(this.white_rook, this.h1);

    this.placePiece(this.black_king, this.e8);
    this.placePiece(this.black_queen, this.d8);

    this.placePiece(this.black_bishop, this.c8);
    this.placePiece(this.black_bishop, this.f8);

    this.placePiece(this.black_knight, this.b8);
    this.placePiece(this.black_knight, this.g8);

    this.placePiece(this.black_rook, this.a8);
    this.placePiece(this.black_rook, this.h8);

    for(i = 0; i < 8; i++){
      columns       = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
      white_square  = columns[i] + '2';
      black_square  = columns[i] + '7';
      this.placePiece(this.white_pawn, this[white_square]) 
      this.placePiece(this.black_pawn, this[black_square]) 
    }
  },

  listLegalMoves: function(start_square){
    var self = this;
    var moving_piece   = start_square.piece;
    var possible_moves = moving_piece.possibleMoves(start_square.name);
    var legal_moves    = [];

    possible_moves.forEach(function(destination){
      var destination_square = self[destination]; 
      if(self._isLegalMove(start_square, destination_square)) legal_moves.push(destination_square.name);
    });
    return legal_moves;

    
  },

  _isLegalMove: function(start_square, destination_square){
    var moving_piece = start_square.piece; 
    // Return false if the start square has no piece
    if(!moving_piece) return false;
    // Return false if the piece in the start square is intrinsically incapable of the move
    if(moving_piece.possibleMoves(start_square.name).indexOf(destination_square.name) == -1) return false;
    
    // Return false if the piece in the destination square belongs to the same side as the moving piece
    if(destination_square.piece && destination_square.piece.color == moving_piece.color) return false;

    // Return false for invalid pawn moves
    //
    if(moving_piece.name == 'P'){
      var start_square_column = start_square.name.substring(0,1);
      var start_square_rank   = start_square.name.substring(1);
      var direction           = moving_piece.color == 'white' ? 'up' : 'down';

      // If the move is straight ahead and there is a piece of any color, return false
      square_ahead_name = (start_square_column + this._nextRank(start_square_rank, direction));

      if(destination_square.name == square_ahead_name && destination_square.piece) return false;

      next_left_diagonal   = this._nextDiagonal(start_square_column, start_square_rank, 'left', direction)
      next_right_diagonal  = this._nextDiagonal(start_square_column, start_square_rank, 'right', direction);
      capture_left_square  = next_left_diagonal ? this[next_left_diagonal] : null;
      capture_right_square = next_right_diagonal ? this[next_right_diagonal] : null;
       
      if(destination_square == capture_left_square && !capture_left_square.piece) return false;
      if(destination_square == capture_right_square && !capture_right_square.piece) return false;
     
    } 

    // Return false if any other piece is blocking the moving piece's path to their destination square.
    // Given that they can't be blocked, we can pre-emptively return true here if the moving piece is a 
    // knight.
    if(moving_piece.name == 'N') return true;

    var start_square_column = start_square.name.substring(0,1);
    var start_square_rank   = start_square.name.substring(1);

    var destination_square_column = destination_square.name.substring(0,1);
    var destination_square_rank   = destination_square.name.substring(1);

    // First, figure out if we need to check the horizontal, vertical, or diagonal path
    var on_horizontal = start_square_rank == destination_square_rank
    var on_vertical   = start_square_column == destination_square_column
    var on_diagonal   = !on_horizontal && !on_vertical;

    if(on_horizontal){
      var start_column_index  = this._columnIndex(start_square_column);
      var target_column_index = this._columnIndex(destination_square_column);
      // Have to figure out if the target square is to the right or left 
      var target_to_right = target_column_index > start_column_index;

      // If _anything_ lies between the destination and the target, the piece isn't allowed there.
      if(target_to_right){
        // Iterate through the squares between the start and the target. If anything is found, return false;
        for(i = start_column_index + 1; i < target_column_index; i++){
          var square_name = this._columnAtIndex(i) + start_square_rank;
          if(this[square_name].piece) return false;
        }
      }else{
        // Iterate through the squares between the start and the target. If anything is found, return false;
        for(i = start_column_index - 1; i > target_column_index; i--){
          var square_name = this._columnAtIndex(i) + start_square_rank;
          if(this[square_name].piece) return false;
        }
      }
    }

    if(on_vertical){
      // Figure out if the target is above or below. 
      // The first part of this condition should return false if you're a black pawn, regardless of the outcome of the second part.
      var target_above = (moving_piece.color == 'white' || moving_piece.name != 'P') && destination_square_rank > start_square_rank

      if(target_above){
        for(i = parseInt(start_square_rank) + 1; i < destination_square_rank; i++){
          var square_name = start_square_column + i;
          if(this[square_name].piece) return false;
        }
      }else{
        for(i = start_square_rank - 1; i > destination_square_rank; i--){
          var square_name = start_square_column + i;
          if(this[square_name].piece) return false;
        }
      }
    
    }

    if(on_diagonal){
      var start_column_index  = this._columnIndex(start_square_column);
      var target_column_index = this._columnIndex(destination_square_column);
      // Figure out if the target is above or below
      var target_above    = (moving_piece.color == 'white' || moving_piece.name != 'P') && destination_square_rank > start_square_rank
     // Figure out if the target is to the right or left
      var target_to_right = target_column_index > start_column_index;

      // Target above and right
      if(target_above && target_to_right){
        var target_square = destination_square.name;

        // Easiest thing is to grab the next diagonal until we reach the destination square, checking each square for a piece 
        var nextDiagonal = this._nextDiagonal(start_square_column, start_square_rank, 'right', 'up');
        while(nextDiagonal != target_square){
          if(this[nextDiagonal].piece) return false;
          var column   = nextDiagonal.substring(0, 1);
          var rank     = parseInt(nextDiagonal.substring(1));
          nextDiagonal = this._nextDiagonal(column, rank, 'right', 'up');
        }

      }
      // Target above and left
      if(target_above && !target_to_right){
        var target_square = destination_square.name;

        // Easiest thing is to grab the next diagonal until we reach the destination square, checking each square for a piece 
        var nextDiagonal = this._nextDiagonal(start_square_column, start_square_rank, 'left', 'up');
        while(nextDiagonal != target_square){
          if(this[nextDiagonal].piece) return false;
          var column   = nextDiagonal.substring(0, 1);
          var rank     = parseInt(nextDiagonal.substring(1));
          nextDiagonal = this._nextDiagonal(column, rank, 'left', 'up');
        }

      }
      // Target below and right
      if(!target_above && target_to_right){
        var target_square = destination_square.name;

        // Easiest thing is to grab the next diagonal until we reach the destination square, checking each square for a piece 
        var nextDiagonal = this._nextDiagonal(start_square_column, start_square_rank, 'right', 'down');
        while(nextDiagonal != target_square){
          if(this[nextDiagonal].piece) return false;
          var column   = nextDiagonal.substring(0, 1);
          var rank     = parseInt(nextDiagonal.substring(1));
          nextDiagonal = this._nextDiagonal(column, rank, 'right', 'down');
        }

      }
      // Target below and left
      if(!target_above && !target_to_right){
        var target_square = destination_square.name;

        // Easiest thing is to grab the next diagonal until we reach the destination square, checking each square for a piece 
        var nextDiagonal = this._nextDiagonal(start_square_column, start_square_rank, 'left', 'down');
        while(nextDiagonal != target_square){
          if(this[nextDiagonal].piece) return false;
          var column   = nextDiagonal.substring(0, 1);
          var rank     = parseInt(nextDiagonal.substring(1));
          nextDiagonal = this._nextDiagonal(column, rank, 'left', 'down');
        }

      }
    }
    return true;
  },


    // FIXME Kind of sucks that these methods are duplicated on Piece.  Maybe do a mixin of some kind?
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
