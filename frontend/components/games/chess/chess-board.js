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
    pieces.push(new Piece("/images/wP.svg", 0, 1));
    pieces.push(new Piece("/images/wP.svg", 1, 1));
    pieces.push(new Piece("/images/wP.svg", 2, 1));
    pieces.push(new Piece("/images/wP.svg", 3, 1));
    pieces.push(new Piece("/images/wP.svg", 4, 1));
    pieces.push(new Piece("/images/wP.svg", 5, 1));
    pieces.push(new Piece("/images/wP.svg", 6, 1));
    pieces.push(new Piece("/images/wP.svg", 7, 1));
    pieces.push(new Piece("/images/wR.svg", 0, 0));
    pieces.push(new Piece("/images/wR.svg", 7, 0));
    pieces.push(new Piece("/images/wN.svg", 1, 0));
    pieces.push(new Piece("/images/wN.svg", 6, 0));
    pieces.push(new Piece("/images/wB.svg", 2, 0));
    pieces.push(new Piece("/images/wB.svg", 5, 0));
    pieces.push(new Piece("/images/wQ.svg", 3, 0));
    pieces.push(new Piece("/images/wK.svg", 4, 0));

    pieces.push(new Piece("/images/bP.svg", 0, 6));
    pieces.push(new Piece("/images/bP.svg", 1, 6));
    pieces.push(new Piece("/images/bP.svg", 2, 6));
    pieces.push(new Piece("/images/bP.svg", 3, 6));
    pieces.push(new Piece("/images/bP.svg", 4, 6));
    pieces.push(new Piece("/images/bP.svg", 5, 6));
    pieces.push(new Piece("/images/bP.svg", 6, 6));
    pieces.push(new Piece("/images/bP.svg", 7, 6));
    pieces.push(new Piece("/images/bR.svg", 0, 7));
    pieces.push(new Piece("/images/bR.svg", 7, 7));
    pieces.push(new Piece("/images/bN.svg", 1, 7));
    pieces.push(new Piece("/images/bN.svg", 6, 7));
    pieces.push(new Piece("/images/bB.svg", 2, 7));
    pieces.push(new Piece("/images/bB.svg", 5, 7));
    pieces.push(new Piece("/images/bQ.svg", 3, 7));
    pieces.push(new Piece("/images/bK.svg", 4, 7));

    return pieces;
  };

  const createBoard = () => {
    var board = [];
    for (var i = yAxis.length - 1; i >= 0; i--) {
      for (var j = 0; j < xAxis.length; j++) {
        let image = null;
        piecesRef.current.forEach((piece) => {
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

  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const theme = props.theme;

  const piecesRef = useRef(addPieces());

  const [board, setBoard] = useState(createBoard());
  return <>{board}</>;
}
