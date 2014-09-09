var chessBoard = function(){
  
  return {

  // Properties for each piece
  
  white_king:   '\u2654',
  white_queen:  '\u2655',
  white_bishop: '\u2657',
  white_knight: '\u2658',
  white_rook:   '\u2656',
  white_pawn:   '\u2659',
  
  black_king:   '\u265A', 
  black_queen:  '\u265B',
  black_bishop: '\u265D',
  black_knight: '\u265E',
  black_rook:   '\u265C',
  black_pawn:   '\u265F',

  // Board properties              
  light_square: '#ffffff',
  dark_square:  '#d3d3d3',
  coordinate:   '#fff',
  border:       '#000',
  square_width: 100,
  board_width: function(){ return (this.square_width * 8) + 40; },
  piece_size: function(){ return this.square_width * .75; },
 
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

  squaresOccupiedBy: function(piece){
    squares = [];
    for(var propName in this){
      if(this[propName].hasOwnProperty('piece')) squares.push(this[propName]);
    }
    return squares.filter(function(square){ return square.piece == piece });
  },

  calculatePawnCaptures: function(from_square, color){
    squares          = [];
    column           = from_square.substring(0, 1);
    rank             = parseInt(from_square.substring(1));
    rank_direction   = color == 'white' ? 'up' : 'down';
    squares.push(this.nextDiagonal(column, rank, rank_direction, 'left'));
    squares.push(this.nextDiagonal(column, rank, rank_direction, 'right'));
    return squares;
  },

  calculatePossibleMoves: function(piece_type, from_square, color){
    color       = color ? color : 'white';
    var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    column      = from_square.substring(0, 1);
    rank        = parseInt(from_square.substring(1));
    moves       = Array();
    
    switch(piece_type){
      case 'P':
        direction = color == 'white' ?  'up' : 'down';
        next_rank = this.nextRank(rank, direction);
        if(next_rank) moves.push(column + next_rank);
        if(rank == 2 && color == 'white' || rank == 7 && color == 'black'){
          // If it's the first move for this pawn... 
          if(color == 'white') moves.push(column + (rank + 2));
          if(color == 'black') moves.push(column + (rank - 2));
        }
      break;
      case 'K':
        // Up and down
        next_up   = this.nextRank(rank, 'up');
        next_down = this.nextRank(rank, 'down');

        if(next_up)   moves.push(column + next_up);
        if(next_down) moves.push(column + next_down);

        // Side to side
        next_right   = this.nextColumn(column,  'right');
        next_left    = this.nextColumn(column,  'left');

        if(next_right) moves.push(next_right + rank);
        if(next_left)  moves.push(next_left + rank);

        // Diagonals
        // Diagonals are essentially an equal number of steps up or down and left or right...
        diagonal_up_right   = this.nextDiagonal(column, rank, 'up', 'right');
        diagonal_up_left    = this.nextDiagonal(column, rank, 'up', 'left');

        diagonal_down_right = this.nextDiagonal(column, rank, 'down', 'right');
        diagonal_down_left  = this.nextDiagonal(column, rank, 'down', 'left');

        if(diagonal_up_right) moves.push(diagonal_up_right);
        if(diagonal_up_left) moves.push(diagonal_up_left);
        if(diagonal_down_right) moves.push(diagonal_down_right);
        if(diagonal_down_left) moves.push(diagonal_down_left);
      break;
      case 'Q':
        // Queen can cover all columns on the rank 
        columns.forEach(function(column){
         
         if(from_square != column + rank) moves.push(column + rank);
        });

        // Queen can cover all ranks on the column
        for(i = 1; i <= 8; i++){
          if(from_square != column + i) moves.push(column + i);
        }

        // Diagonals
        original_column = column;
        original_rank   = rank;

        // First, figure out how far up and right diagonally
        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'up', 'right')){
          next = this.nextDiagonal(current_column, current_rank, 'up', 'right');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }

        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'up', 'left')){
          next = this.nextDiagonal(current_column, current_rank, 'up', 'left');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }
        
        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'down', 'right')){
          next = this.nextDiagonal(current_column, current_rank, 'down', 'right');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }

        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'down', 'left')){
          next = this.nextDiagonal(current_column, current_rank, 'down', 'left');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }
      break;
      case 'B':
        // Just give them diagonals
        // Diagonals
        original_column = column;
        original_rank   = rank;

        // First, figure out how far up and right diagonally
        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'up', 'right')){
          next = this.nextDiagonal(current_column, current_rank, 'up', 'right');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }

        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'up', 'left')){
          next = this.nextDiagonal(current_column, current_rank, 'up', 'left');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }
        
        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'down', 'right')){
          next = this.nextDiagonal(current_column, current_rank, 'down', 'right');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }

        current_column  = original_column;
        current_rank    = original_rank;

        while(this.nextDiagonal(current_column, current_rank, 'down', 'left')){
          next = this.nextDiagonal(current_column, current_rank, 'down', 'left');
          moves.push(next);
          current_column = next.substring(0,1);
          current_rank   = parseInt(next.substring(1));
        }
      break;
      case 'N':
        if(rank + 2 <= 8){
          // In other words, if we can move up 2
          if(columns.indexOf(column) + 1 <= 7){
            square = columns[columns.indexOf(column) + 1] + (rank + 2);
            moves.push(square);
            // If we can then move right 1
          }

          if(columns.indexOf(column) - 1 >= 0){
            square = columns[columns.indexOf(column) - 1] + (rank + 2);
            moves.push(square);
            // If we can then move left 1
          }
        }

        if(rank - 2 >= 1){
          // In other words, if we can move down 2 
          if(columns.indexOf(column) + 1 <= 7){
            // If we can then move right 1 
            square = columns[columns.indexOf(column) + 1] + (rank - 2);
            moves.push(square);
          }

          if(columns.indexOf(column) - 1 >= 0){
            // If we can then move left 1 
            square = columns[columns.indexOf(column) - 1] + (rank - 2);
            moves.push(square);
          }

        }

        if(rank + 1 <= 8){
          // In other words, if we can move up 1 
          if(columns.indexOf(column) + 2 <= 7){
            // If we can then move right 2 
            square = columns[columns.indexOf(column) + 2] + (rank + 1);
            moves.push(square);
          }

          if(columns.indexOf(column) - 2 >= 0){
            // If we can then move left 1 
            square = columns[columns.indexOf(column) - 2] + (rank + 1);
            moves.push(square);
          }
        }
        
        if(rank - 1 >= 1){
          // In other words, if we can move down 1 
          if(columns.indexOf(column) + 2 <= 7){
            // If we can then move right 2 
            square = columns[columns.indexOf(column) + 2] + (rank - 1);
            moves.push(square);
          }

          if(columns.indexOf(column) - 2 >= 0){
            // If we can then move left 1 
            square = columns[columns.indexOf(column) - 2] + (rank - 1);
            moves.push(square);
          }
        }
      break;
      case 'R':
        // Just give them straight stuff
        // Rook can cover all columns on the rank 
        columns.forEach(function(column){
         
         if(from_square != column + rank) moves.push(column + rank);
        });

        // Rook can cover all ranks on the column
        for(i = 1; i <= 8; i++){
          if(from_square != column + i) moves.push(column + i);
        }
      break;
    
    
    }
    return moves;
  },

  nextColumn: function(column, direction){

    var columns   = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var next      = null; 
    if(direction == 'right'){
      next = columns[columns.indexOf(column) + 1];
    }else{
      next = columns[columns.indexOf(column) - 1];
    }
    return next ? next : null;
  },

  nextRank: function(rank, direction){
    var next = null;
    if(direction == 'up'){
      next = rank < 8 ? rank + 1 : null; 
    }else{
      next = rank > 1 ? rank - 1 : null; 
    }
    return next ? next : null;
  },

  nextDiagonal: function(column, rank, rank_direction, column_direction){
    next_diagonal = null;
    next_rank     = this.nextRank(rank, rank_direction);
    next_column   = this.nextColumn(column, column_direction);
    if(next_rank && next_column) next_diagonal = next_column + next_rank;
    
    return next_diagonal;
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
  
  placePiece: function(piece, square){
    square.piece = piece;
    if(!this.ctx) return true;
    coord = this.calculateCoordinate(square.name);
    x     = coord[0];
    y     = coord[1];
   
    this.ctx.font =  this.piece_size()+"px Arial";
    this.ctx.fillStyle = '#000'
    this.ctx.fillText(piece, x, y);
  },

  movePiece: function(from, to, is_capture){
    piece = from.piece;
    if(is_capture) this.removePiece(to);
    this.removePiece(from);
    this.placePiece(piece, to);
  },
  
  removePiece: function(square){
    square.piece = null;
    column = square.name.substring(0, 1);
    rank   = parseInt(square.name.substring(1));

    odd_blacks  = Array('a', 'c', 'e', 'g');
    even_blacks = Array('b', 'd', 'f', 'h');
                        // If we're on an odd numbered rank and the column is in the odd_blacks list or if we're on an even numbered rank and the column is in the even_blacks list
    is_black_square = (odd_blacks.indexOf(column) >= 0 && rank % 2 == 1) || (even_blacks.indexOf(column) >= 0 && rank % 2 == 0);
    
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
    

  }


  }
}
