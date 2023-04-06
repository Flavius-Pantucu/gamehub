import { useEffect, useState, useRef } from "react";
import Square from "./square";

class Piece {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
  }
}

export default function ChessBoard(props) {
  const addPieces = () => {
    const pieces = [];
    pieces.push(new Piece("/images/wP.svg", 0, 6));
    pieces.push(new Piece("/images/wP.svg", 1, 6));
    pieces.push(new Piece("/images/wP.svg", 2, 6));
    pieces.push(new Piece("/images/wP.svg", 3, 6));
    pieces.push(new Piece("/images/wP.svg", 4, 6));
    pieces.push(new Piece("/images/wP.svg", 5, 6));
    pieces.push(new Piece("/images/wP.svg", 6, 6));
    pieces.push(new Piece("/images/wP.svg", 7, 6));
    pieces.push(new Piece("/images/wR.svg", 0, 7));
    pieces.push(new Piece("/images/wR.svg", 7, 7));
    pieces.push(new Piece("/images/wN.svg", 1, 7));
    pieces.push(new Piece("/images/wN.svg", 6, 7));
    pieces.push(new Piece("/images/wB.svg", 2, 7));
    pieces.push(new Piece("/images/wB.svg", 5, 7));
    pieces.push(new Piece("/images/wQ.svg", 3, 7));
    pieces.push(new Piece("/images/wK.svg", 4, 7));

    pieces.push(new Piece("/images/bP.svg", 0, 1));
    pieces.push(new Piece("/images/bP.svg", 1, 1));
    pieces.push(new Piece("/images/bP.svg", 2, 1));
    pieces.push(new Piece("/images/bP.svg", 3, 1));
    pieces.push(new Piece("/images/bP.svg", 4, 1));
    pieces.push(new Piece("/images/bP.svg", 5, 1));
    pieces.push(new Piece("/images/bP.svg", 6, 1));
    pieces.push(new Piece("/images/bP.svg", 7, 1));
    pieces.push(new Piece("/images/bR.svg", 0, 0));
    pieces.push(new Piece("/images/bR.svg", 7, 0));
    pieces.push(new Piece("/images/bN.svg", 1, 0));
    pieces.push(new Piece("/images/bN.svg", 6, 0));
    pieces.push(new Piece("/images/bB.svg", 2, 0));
    pieces.push(new Piece("/images/bB.svg", 5, 0));
    pieces.push(new Piece("/images/bQ.svg", 3, 0));
    pieces.push(new Piece("/images/bK.svg", 4, 0));

    return pieces;
  };

  const createBoard = () => {
    var board = [];
    for (var i = 0; i < yAxis.length; i++) {
      for (var j = 0; j < xAxis.length; j++) {
        let image = null;
        pieces.forEach((piece) => {
          if (piece.x == j && piece.y == i) image = piece.image;
        });

        board.push(
          <Square
            key={`${i},${j}`}
            theme={theme}
            coords={[i, j]}
            axis={[xAxis, yAxis]}
            image={image}
          />
        );
      }
    }
    return board;
  };

  const grabPiece = (e) => {
    selectedPieceRef.current = e.target;

    const piece = selectedPieceRef.current;
    if (piece.classList.contains("piece")) {
      const x = e.clientX - piece.parentNode.offsetLeft - piece.offsetWidth / 2;
      const y = e.clientY - piece.parentNode.offsetTop - piece.offsetHeight / 2;
      
      const row = Math.floor((e.clientY - chessboardRef.current.offsetTop) / piece.offsetHeight);
      const col = Math.floor((e.clientX - chessboardRef.current.offsetLeft) / piece.offsetWidth);
      setCurrentPiece({x:col, y:row});

      piece.style.position = "absolute";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.zIndex = 9999;
    }else
      selectedPieceRef.current = null;
  };

  const movePiece = (e) => {
    if (selectedPieceRef.current == null || chessboardRef == null) return;
    
    const piece = selectedPieceRef.current;
    const board = chessboardRef.current;

    const minX = board.offsetLeft;
    const minY = board.offsetTop;
    const x = e.clientX - piece.parentNode.offsetLeft - piece.offsetWidth / 2;
    const y = e.clientY - piece.parentNode.offsetTop - piece.offsetHeight / 2;

    piece.style.position = "absolute";
    if(minX > x)
      piece.style.left = x + "px";
    else
      piece.style.left = minX + "px";

    piece.style.top = y + "px";
  };

  const letPiece = (e) => {
    if(selectedPieceRef.current == null) return;

    const piece = selectedPieceRef.current;

    let row = Math.floor((e.clientY - chessboardRef.current.offsetTop) / piece.offsetHeight);
    let col = Math.floor((e.clientX - chessboardRef.current.offsetLeft) / piece.offsetWidth);
    if(row == currentPiece.y && col == currentPiece.x){
      piece.style.position = "relative";
      piece.style.left = "0px";
      piece.style.top = "0px";
    }
    else if(row < 8 && col < 8 && row >= 0 && col >= 0){
      pieces.forEach((piece) => {
        if(piece.x == currentPiece.x && piece.y == currentPiece.y){
          piece.x = col;
          piece.y = row
        }
      })
      
      setPieces((value) => {
        const pieces = value.map((piece) => {
          if(piece.x == currentPiece.x && piece.y == currentPiece.y){
            piece.x = col;
            piece.y = row;
          }
          return piece;
        });
        return pieces;
      });

      setBoard(createBoard());
    
    }else{
      piece.style.position = "relative";
      piece.style.left = "0px";
      piece.style.top = "0px";
    }


    selectedPieceRef.current = null;
  };

  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const theme = props.theme;

  const selectedPieceRef = useRef(null);
  const chessboardRef = useRef(null);

  const [pieces, setPieces] = useState(addPieces());
  const [board, setBoard] = useState(createBoard());
  const [currentPiece, setCurrentPiece] = useState({x: 0, y: 0});

  return (
    <div
      ref={chessboardRef}
      onTouchEnd={(e) => letPiece(e)}
      onTouchMove={(e) => movePiece(e)}
      onTouchStart={(e) => grabPiece(e)}
      onMouseUp={(e) => letPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      className="grid grid-rows-[8] grid-cols-8 aspect-square h-[90%] min-h-[384px] max-h-[384px] md:max-h-max cursor-pointer">
      {board}
    </div>
  );
}
