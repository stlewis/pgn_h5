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
    white_moves: [],
    black_moves: [],
    moves: [],
    plys: [],
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

       movelist = content.replace(/\[.*\]/g, '');
       movelist = movelist.trim();

       // Pull result line off
       movelist = movelist.replace(/(1\-0|0-1)/, '');
       console.log(movelist);

      lines         = movelist.split(/\d+\./);
      compact_lines = [];

      lines.forEach(function(l, idx){ var trimmed = l.trim(); if(trimmed != "") compact_lines[idx] = trimmed;  });
      self  = this;

      var line_number   = 0;
      
      compact_lines.forEach(function(line, idx){
        idx  = idx - 1;
        var move_info   = {
          white: null,
          black: null,
          comment: null,
          number: null
        };


        var match_for_white;
        var match_for_black;
        var move_comment;
        
        match_for_white        = line.match(/^([abcdefghKQBNRxO\-1-8]+)/);
        match_for_black        = line.match(/^([abcdefghKQBNRxO\-1-8]+)\s([abcdefghKQBNRxO\-1-8]+)/);
        continuation_for_black = line.match(/^\.\.([abcdefghKQBNRxO\-1-8]+)/);
        move_comment           = line.match(/\{(.*)\}/);


        if(!continuation_for_black) line_number += 1; 
        
        move_info['number'] = line_number;

        if(match_for_white) move_info['white']        = match_for_white[1];
        if(match_for_black) move_info['black']        = match_for_black[2];
        if(continuation_for_black) move_info['black'] = continuation_for_black[1];
        if(move_comment) move_info['comment']         = move_comment[1];

        self.moves.push(move_info);
        
        if(move_info['white']) self.plys.push({movetext: move_info['white'], moveindex: idx});
        if(move_info['black']) self.plys.push({movetext: move_info['black'], moveindex: idx});

      });
      return this.moves;
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

      // Black's move
      if(pgn == '..') return true;

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
