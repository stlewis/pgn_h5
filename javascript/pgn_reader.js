var pgnReader = function(){
  return {
    // Tag pair attributes
    event: 'Untitled Event',
    site: 'Unknown Site',
    date: 'Unknown',
    round: 'N/A',
    white: 'White Player',
    black: 'Black Player',
    result: null,
    white_moves: Array(),
    black_moves: Array(),
    moves: Array(),
    board: null,


    init: function(board){
      this.board = board;
      return this;    
    },
    
    parse: function(content){
      self = this;
      // Fill out our tag-pairs with available information 

      this.event = /\[Event (.*)\]/.exec(content)[1]
      this.site  = /\[Site (.*)\]/.exec(content)[1]
      this.date  = /\[Date (.*)\]/.exec(content)[1]
      this.round = /\[Round (.*)\]/.exec(content)[1]
      this.white = /\[White (.*)\]/.exec(content)[1]
      this.black = /\[Black (.*)\]/.exec(content)[1]
      this.result = /\[Result (.*)\]/.exec(content)[1]

      moves = content.replace(/\[.*\]/g, '');
      moves = moves.trim();

      lines = moves.match(/\d+\.(\s)?([\w\-\+]+)\s?([\w\-\+]+)?(\n)?/g)
      
      lines.forEach(function(line){
        match = /\d+\.(\s)?([\w\-\+]+)\s?([\w\-\+]+)?(\n)?/.exec(line);
        console.log(match);
        white = match[2];
        black = match[3];
        self.white_moves.push(white);
        self.black_moves.push(black);
        self.moves.push(white);
        self.moves.push(black);
      });
      

    },

    decodePGN: function(pgn, side){
      // DecodePGN takes the movetext for a single move, (1 ply) and returns an array of 'moves' that the board can act on.
      // So, for instance, for the PGN e4:
      // [{start: board.e2, destination: board.e4}]
      // For the PGN Nf3:
      // [{start: board.g1, destination: board.e4}]
      // For the PGN O-O:
      // [{start: board.h1, destination: board.f1}, {start: board.e1, destination: board.g1}]
      var side        = side ? side : 'white'; // Default to white for brevity
      var start       = null;
      var destination = null;
      var moves       = [];

      // White Win
      if(pgn == '1-0') return true;

      // Black Win
      if(pgn == '0-1') return true;

      // Castling
      if(pgn == 'O-O'){
        king_square = side == 'white' ? this.board.e1 : this.board.e8;
        rook_square = side == 'white' ? this.board.h1 : this.board.h8;

        king_dest   = side == 'white' ? this.board.g1 : this.board.g8;
        rook_dest   = side == 'white' ? this.board.f1 : this.board.f8;
        
        moves.push({start: king_square, destination: king_dest});
        moves.push({start: rook_square, destination: rook_dest});
        return moves;
      }

      if(pgn == 'O-O-O'){
        king_square = side == 'white' ? this.board.e1 : this.board.e8;
        rook_square = side == 'white' ? this.board.a1 : this.board.a8;

        king_dest   = side == 'white' ? this.board.c1 : this.board.c8;
        rook_dest   = side == 'white' ? this.board.d1 : this.board.d8;
        moves.push({start: king_square, destination: king_dest});
        moves.push({start: rook_square, destination: rook_dest});
        return moves;
      }

      // Pawn advancement with optional check or checkmate e4 e4+ e4#
      
      if(matches = pgn.match(/^([a-h][1-8])(\+)?(\#)?$/)){
        destination               = this.board[matches[1]];
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, 'P'));
        
        possible_starting_squares.forEach(function(square){
          possible_moves = this.board.listLegalMoves(square);
          if(possible_moves.indexOf(destination.name) != -1) start = square;
        });
              
        moves.push({start: start, destination: destination});
       
        return moves;
      }
      
      // Pawn advancement with capture and optional check or checkmate exf4
      if(matches = pgn.match(/^[a-h]([1-8])?x([a-h][1-8])(\+)?(\#)?$/)){
        destination               = this.board[matches[2]];
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, 'P'));
        
        possible_starting_squares.forEach(function(square){
          possible_moves = this.board.listLegalMoves(square);
          if(possible_moves.indexOf(destination.name) != -1) start = square;
        });
        
        moves.push({start: start, destination: destination, is_capture: true});
        
        return moves;
      }
      
      // Pawn advancement with promotion e8=Q and optional check or checkmate
      if(matches = pgn.match(/^([a-h][1-8])=([QBNR])(\+)?(\#)?$/)){
        destination               = this.board[matches[1]];
        promoting_piece           = this.pieceByCode(side, matches[2]);
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, 'P'));
        
        possible_starting_squares.forEach(function(square){
          possible_moves = this.board.listLegalMoves(square)
          if(possible_moves.indexOf(destination.name) != -1) start = square;
        });
        
        moves.push({start: start, destination: destination, promoting_piece: promoting_piece});
        
        return moves;
      }
      
      // Pawn advancement with capture, promotion and optional check or checkmate fxe8=Q
      if(matches = pgn.match(/^[a-h]x([a-h][1-8])=([QBNR])(\+)?(\#)?$/)){
        destination               = this.board[matches[1]];
        promoting_piece           = this.pieceByCode(side, matches[2]);
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, 'P'));
        
        possible_starting_squares.forEach(function(square){
          this.board.listLegalMoves(square);
          if(possible_moves.indexOf(destination.name) != -1) start = square;
        });
        
        moves.push({start: start, destination: destination, is_capture: true, promoting_piece: promoting_piece});
        
        return moves;
      }
      
      //
      // Piece movement Nf3 with optional check or checkmate
      if(matches = pgn.match(/^([KQBNR])([a-h][1-8])(\+)?(\#)?$/)){
        destination               = this.board[matches[2]];
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, matches[1]));
        
        possible_starting_squares.forEach(function(square){
          possible_moves = this.board.listLegalMoves(square);
          if(possible_moves.indexOf(destination.name) != -1) start = square;
        });
        
        moves.push({start: start, destination: destination});
        
        return moves;
      }
      // Piece with specific column movement Ngh6 with optional check or checkmate
      if(matches = pgn.match(/^([KQBNR])([a-h])([a-h][1-8])(\+)?(\#)?$/)){
        destination               = this.board[matches[3]];
        start_column              = matches[2]
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, matches[1]));
        start                     = possible_starting_squares.filter(function(square){ return square.name.substring(0,1) == start_column })[0]; 
        
        moves.push({start: start, destination: destination})
        
        return moves;
      }
      
      // Piece with specifc square movement Ng3e4 with optional check or checkmate
      if(matches = pgn.match(/^([KQBNR])([a-h][1-8])([a-h][1-8])(\+)?(\#)?$/)){
        destination  = this.board[matches[3]];
        start        = this.board[matches[2]];
        
        moves.push({start: start, destination: destination})
        
        return moves;
      }
      
      
      // Piece capture Nxe4 with optional check or checkmate
      if(matches = pgn.match(/^([KQBNR])x([a-h][1-8])(\+)?(\#)?$/)){
        destination               = this.board[matches[2]];
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, matches[1]));
        possible_starting_squares.forEach(function(square){
          possible_moves = this.board.listLegalMoves(square);
          if(possible_moves.indexOf(destination.name) != -1) start = square;
        });
        
        moves.push({start: start, destination: destination, is_capture: true});
        
        return moves;
      }
      // Piece with specific column capture Ngxh6 with optional check or checkmate
      if(matches = pgn.match(/^([KQBNR])([a-h])x([a-h][1-8])(\+)?(\#)?$/)){
        destination               = this.board[matches[3]];
        start_column              = matches[2]
        possible_starting_squares = this.board.squaresOccupiedBy(this.pieceByCode(side, matches[1]));
        start                     = possible_starting_squares.filter(function(square){ return square.name.substring(0,1) == start_column })[0]; 
        
        moves.push({start: start, destination: destination, is_capture: true})
        
        return moves;
      }
      
        // Piece with specific square capture Ng3xe4 with optional check or checkmate
      if(matches = pgn.match(/^([KQBNR])([a-h][1-8])x([a-h][1-8])(\+)?(\#)?$/)){
        destination  = this.board[matches[3]];
        start        = this.board[matches[2]];
        
        moves.push({start: start, destination: destination, is_capture: true})
        
        return moves;
      }
      
    },

    pieceByCode: function(side, code){
      switch(code){
        case 'P':
          return this.board[side + '_pawn'];
        break;
        case 'K':
          return this.board[side + '_king'];
        break;
        case 'Q':
          return this.board[side + '_queen'];
        break;
        case 'B':
          return this.board[side + '_bishop'];
        break;
        case 'N':
          return this.board[side + '_knight'];
        break;
        case 'R':
          return this.board[side + '_rook'];
        break;
      }
    }
  
  
  }


}
