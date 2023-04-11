import { useEffect, useState, useRef } from "react";
import Square from "./square";

class Piece {
  constructor(image, type, color, mark, x, y) {
    this.image = image;
    this.color = color;
    this.type = type;
    this.mark = mark;
    this.x = x;
    this.y = y;
  }
}

export default function ChessBoard(props) {
  const addPieces = () => {
    const pieces = [];
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 0, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 1, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 2, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 3, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 4, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 5, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 6, 6));
    pieces.push(new Piece("/images/wP.svg", "pawn", "white", false, 7, 6));
    pieces.push(new Piece("/images/wR.svg", "rook", "white", false, 0, 7));
    pieces.push(new Piece("/images/wR.svg", "rook", "white", false, 7, 7));
    pieces.push(new Piece("/images/wN.svg", "knight", "white", false, 1, 7));
    pieces.push(new Piece("/images/wN.svg", "knight", "white", false, 6, 7));
    pieces.push(new Piece("/images/wB.svg", "bishop", "white", false, 2, 7));
    pieces.push(new Piece("/images/wB.svg", "bishop", "white", false, 5, 7));
    pieces.push(new Piece("/images/wQ.svg", "queen", "white", false, 3, 7));
    pieces.push(new Piece("/images/wK.svg", "king", "white", false, 4, 7));

    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 0, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 1, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 2, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 3, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 4, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 5, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 6, 1));
    pieces.push(new Piece("/images/bP.svg", "pawn", "black", false, 7, 1));
    pieces.push(new Piece("/images/bR.svg", "rook", "black", false, 0, 0));
    pieces.push(new Piece("/images/bR.svg", "rook", "black", false, 7, 0));
    pieces.push(new Piece("/images/bN.svg", "knight", "black", false, 1, 0));
    pieces.push(new Piece("/images/bN.svg", "knight", "black", false, 6, 0));
    pieces.push(new Piece("/images/bB.svg", "bishop", "black", false, 2, 0));
    pieces.push(new Piece("/images/bB.svg", "bishop", "black", false, 5, 0));
    pieces.push(new Piece("/images/bQ.svg", "queen", "black", false, 3, 0));
    pieces.push(new Piece("/images/bK.svg", "king", "black", false, 4, 0));

    return pieces;
  };

  const createBoard = () => {
    for (var i = 0; i < yAxis.length; i++) {
      for (var j = 0; j < xAxis.length; j++) {
        let image = null;
        pieces.forEach((piece) => {
          if (piece.x == j && piece.y == i) image = piece.image;
        });

        board.push(
          <Square
            key={`${i},${j}`}
            axis={[xAxis, yAxis]}
            image={image}
            coords={[i, j]}
            lastMove={lastMove}
            currentPiece={currentPiece}
          />
        );
      }
    }
  };

  const grabPiece = (e) => {
    if(e.nativeEvent.button != 0) return;
    
    e.target.classList.contains("mark") ? selectedPieceRef.current = e.target.parentNode : selectedPieceRef.current = e.target;
    const piece = selectedPieceRef.current;
    const chessboard = chessboardRef.current;

    if (piece.classList.contains("piece")) {
      const x = e.clientX - piece.parentNode.offsetLeft - piece.offsetWidth / 2;
      const y = e.clientY - piece.parentNode.offsetTop - piece.offsetHeight / 2;

      const row = Math.floor(
        (e.clientY - chessboard.offsetTop) / piece.offsetHeight
      );
      const col = Math.floor(
        (e.clientX - chessboard.offsetLeft) / piece.offsetWidth
      );
      setCurrentPiece({ x: col, y: row });

      piece.style.position = "absolute";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.zIndex = 9999;
    } else selectedPieceRef.current = null;
  };

  const movePiece = (e) => {
    if (selectedPieceRef.current == null || chessboardRef == null) return;

    const piece = selectedPieceRef.current;

    const x = e.clientX - piece.parentNode.offsetLeft - piece.offsetWidth / 2;
    const y = e.clientY - piece.parentNode.offsetTop - piece.offsetHeight / 2;

    piece.style.position = "absolute";
    piece.style.left = x + "px";
    piece.style.top = y + "px";
  };

  const letPiece = (e) => {
    if (selectedPieceRef.current == null) return;

    const piece = selectedPieceRef.current;
    const chessboard = chessboardRef.current;

    const row = Math.floor(
      (e.clientY - chessboard.offsetTop) / piece.offsetHeight
    );
    const col = Math.floor(
      (e.clientX - chessboard.offsetLeft) / piece.offsetWidth
    );

    if (row == currentPiece.y && col == currentPiece.x) {
      piece.style.position = "relative";
      piece.style.left = "0px";
      piece.style.top = "0px";
    } else if (row < 8 && col < 8 && row >= 0 && col >= 0) {

      soundsRef.current[0].play();
      setLastMove([{ x: currentPiece.x, y: currentPiece.y }, { x: col, y: row }]);

      setPieces((value) => {
        const pieces = value.map((piece) => {
          if (piece.x == currentPiece.x && piece.y == currentPiece.y) {
            piece.x = col;
            piece.y = row;
          }
          return piece;
        });
        return pieces;
      });

      setCurrentPiece({ x: null, y: null });
    } else {
      piece.style.position = "relative";
      piece.style.left = "0px";
      piece.style.top = "0px";
    }
    selectedPieceRef.current = null;
  };

  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const board = [];

  const soundsRef = useRef(null);
  const chessboardRef = useRef(null);
  const selectedPieceRef = useRef(null);

  const [pieces, setPieces] = useState(addPieces());
  const [currentPiece, setCurrentPiece] = useState({ x: null, y: null });
  const [lastMove, setLastMove] = useState([ { x: null, y: null }, { x: null, y: null } ]);

  createBoard();

  useEffect(() => {
    soundsRef.current = new Array(3);
    soundsRef.current[0] = new Audio("/sounds/move.mp3");
    soundsRef.current[1] = new Audio("/sounds/castle.mp3");
    soundsRef.current[2] = new Audio("/sounds/capture.mp3");
  }, []);

  return (
    <div
      ref={chessboardRef}
      onMouseUp={(e) => letPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onContextMenu={(e) => e.preventDefault()}
      className="grid grid-rows-[8] grid-cols-8 aspect-square h-[90%] min-h-[384px] max-h-[384px] md:max-h-max cursor-pointer">
      {board}
    </div>
  );
}
