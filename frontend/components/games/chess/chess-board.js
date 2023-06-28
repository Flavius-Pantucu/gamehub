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
            legalMoves={legalMoves}
            currentPiece={currentPiece}
          />
        );
      }
    }
  };

  const calculatePawnMoves = (i, j, color) => {
    const legalMoves = [];
    if (color == "white") {
      let move = pieces.filter((piece) => piece.x == j && piece.y == i - 1).length == 0;
      if (move) {
        legalMoves.push({ x: j, y: i - 1 });
        move = pieces.filter((piece) => piece.x == j && piece.y == i - 2).length == 0;
        if (i == 6 && move) legalMoves.push({ x: j, y: i - 2 });
      }

      let capture = pieces.filter(
        (piece) => (piece.x == j - 1 || piece.x == j + 1) && piece.y == i - 1 && piece.color == "black"
      );
      if (capture.length > 0) {
        capture.forEach((piece) => {
          legalMoves.push({ x: piece.x, y: piece.y });
        }, legalMoves);
      }
    } else if (color == "black") {
      let condition = pieces.filter((piece) => piece.x == j && piece.y == i + 1).length == 0;
      if (condition) {
        legalMoves.push({ x: j, y: i + 1 });
        condition = pieces.filter((piece) => piece.x == j && piece.y == i + 2).length == 0;
        if (i == 1 && condition) legalMoves.push({ x: j, y: i + 2 });
      }

      let capture = pieces.filter(
        (piece) => (piece.x == j - 1 || piece.x == j + 1) && piece.y == i + 1 && piece.color == "white"
      );
      if (capture.length > 0) {
        capture.forEach((piece) => {
          legalMoves.push({ x: piece.x, y: piece.y });
        }, legalMoves);
      }
    } else return [];
    // enpassant and promotion check
    return legalMoves;
  };

  const calculateKnightMoves = (i, j, color) => {
    const legalMoves = [];

    const x_neighbors = [-2, -1, 1, 2, 2, 1, -1, -2];
    const y_neighbors = [-1, -2, -2, -1, 1, 2, 2, 1];

    for (var n = 0; n < 8; n++) {
      let move = pieces.filter((piece) => piece.x == j + x_neighbors[n] && piece.y == i + y_neighbors[n]).length == 0;
      if (move) legalMoves.push({ x: j + x_neighbors[n], y: i + y_neighbors[n] });

      let capture = pieces.filter(
        (piece) => piece.x == j + x_neighbors[n] && piece.y == i + y_neighbors[n] && piece.color != color
      );
      if (capture.length > 0) legalMoves.push({ x: j + x_neighbors[n], y: i + y_neighbors[n] });
    }

    return legalMoves;
  };

  const calculateBishopMoves = (i, j, color) => {
    const legalMoves = [];
    for (var xAxis = j - 1, yAxis = i - 1; xAxis >= 0, yAxis >= 0; xAxis--, yAxis--) {
      let move = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis).length == 0;
      if (move) legalMoves.push({ x: xAxis, y: yAxis });

      let capture = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: xAxis, y: yAxis });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    for (var xAxis = j + 1, yAxis = i + 1; xAxis < 8, yAxis < 8; xAxis++, yAxis++) {
      let move = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis).length == 0;
      if (move) legalMoves.push({ x: xAxis, y: yAxis });

      let capture = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: xAxis, y: yAxis });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    for (var xAxis = j - 1, yAxis = i + 1; xAxis >= 0, yAxis < 8; xAxis--, yAxis++) {
      let move = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis).length == 0;
      if (move) legalMoves.push({ x: xAxis, y: yAxis });

      let capture = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: xAxis, y: yAxis });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    for (var xAxis = j + 1, yAxis = i - 1; xAxis < 8, yAxis >= 0; xAxis++, yAxis--) {
      let move = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis).length == 0;
      if (move) legalMoves.push({ x: xAxis, y: yAxis });

      let capture = pieces.filter((piece) => piece.x == xAxis && piece.y == yAxis && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: xAxis, y: yAxis });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    return legalMoves;
  };

  const calculateRookMoves = (i, j, color) => {
    const legalMoves = [];
    for (var xAxis = j - 1; xAxis >= 0; xAxis--) {
      let move = pieces.filter((piece) => piece.x == xAxis && piece.y == i).length == 0;
      if (move) legalMoves.push({ x: xAxis, y: i });

      let capture = pieces.filter((piece) => piece.x == xAxis && piece.y == i && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: xAxis, y: i });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    for (var xAxis = j + 1; xAxis < 8; xAxis++) {
      let move = pieces.filter((piece) => piece.x == xAxis && piece.y == i).length == 0;
      if (move) legalMoves.push({ x: xAxis, y: i });

      let capture = pieces.filter((piece) => piece.x == xAxis && piece.y == i && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: xAxis, y: i });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    for (var yAxis = i + 1; yAxis < 8; yAxis++) {
      let move = pieces.filter((piece) => piece.x == j && piece.y == yAxis).length == 0;
      if (move) legalMoves.push({ x: j, y: yAxis });

      let capture = pieces.filter((piece) => piece.x == j && piece.y == yAxis && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: j, y: yAxis });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    for (var yAxis = i - 1; yAxis >= 0; yAxis--) {
      let move = pieces.filter((piece) => piece.x == j && piece.y == yAxis).length == 0;
      if (move) legalMoves.push({ x: j, y: yAxis });

      let capture = pieces.filter((piece) => piece.x == j && piece.y == yAxis && piece.color != color);
      if (capture.length > 0) legalMoves.push({ x: j, y: yAxis });

      if (capture.length > 0 || !(move || capture.length > 0)) break;
    }
    return legalMoves;
  };

  const calculateQueenMoves = (i, j, color) => {
    const b_legalMoves = [...calculateBishopMoves(i, j, color)];
    const r_legalMoves = [...calculateRookMoves(i, j, color)];
    return [...b_legalMoves, ...r_legalMoves];
  };

  const calculateKingMoves = (i, j, color) => {
    const legalMoves = [];

    const x_neighbors = [-1, 0, 1, 1, 1, 0, -1, -1];
    const y_neighbors = [-1, -1, -1, 0, 1, 1, 1, 0];

    for (var n = 0; n < 8; n++) {
      let move = pieces.filter((piece) => piece.x == j + x_neighbors[n] && piece.y == i + y_neighbors[n]).length == 0;
      if (move) legalMoves.push({ x: j + x_neighbors[n], y: i + y_neighbors[n] });

      let capture = pieces.filter(
        (piece) => piece.x == j + x_neighbors[n] && piece.y == i + y_neighbors[n] && piece.color != color
      );
      if (capture.length > 0) legalMoves.push({ x: j + x_neighbors[n], y: i + y_neighbors[n] });
    }
    return legalMoves;
    //check castle previlieges
  };

  const calculateLegalMoves = (i, j) => {
    var moves = [];
    pieces.forEach((piece) => {
      if (piece.x == j && piece.y == i) {
        switch (piece.type) {
          case "pawn":
            moves = calculatePawnMoves(i, j, piece.color);
            break;
          case "rook":
            moves = calculateRookMoves(i, j, piece.color);
            break;
          case "knight":
            moves = calculateKnightMoves(i, j, piece.color);
            break;
          case "bishop":
            moves = calculateBishopMoves(i, j, piece.color);
            break;
          case "queen":
            moves = calculateQueenMoves(i, j, piece.color);
            break;
          case "king":
            moves = calculateKingMoves(i, j, piece.color);
            break;
        }
      }
    }, moves);
    return moves;
  };

  const grabPiece = (e) => {
    if (e.nativeEvent.button != 0) return;
    e.target.classList.contains("mark")
      ? (selectedPieceRef.current = e.target.parentNode)
      : (selectedPieceRef.current = e.target);
    const piece = selectedPieceRef.current;
    const chessboard = chessboardRef.current;
    if (piece.classList.contains("piece")) {
      const x = e.clientX - piece.parentNode.offsetLeft - piece.offsetWidth / 2;
      const y = e.clientY - piece.parentNode.offsetTop - piece.offsetHeight / 2;

      const row = Math.floor((e.clientY - chessboard.offsetTop) / (piece.offsetHeight + 4));
      const col = Math.floor((e.clientX - chessboard.offsetLeft) / (piece.offsetWidth + 4));
      if (!pieces.filter((piece) => piece.x == col && piece.y == row && piece.color == playerTurnRef.current).length)
        return;
      currentPiece.x == col && currentPiece.y == row
        ? setCurrentPiece({ x: col, y: row, retouch: true })
        : setCurrentPiece({ x: col, y: row, retouch: false });

      piece.style.position = "absolute";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.zIndex = 9999;

      legalMovesRef.current = calculateLegalMoves(row, col);
      setLegalMoves([...legalMovesRef.current]);
    } else {
      selectedPieceRef.current = null;
      setCurrentPiece({ x: null, y: null, retouch: false });
      setLegalMoves([]);
    }
  };

  const movePiece = (e) => {
    if (
      selectedPieceRef.current == null ||
      chessboardRef == null ||
      !pieces.filter(
        (piece) => piece.x == currentPiece.x && piece.y == currentPiece.y && piece.color == playerTurnRef.current
      ).length
    )
      return;
    const piece = selectedPieceRef.current;
    const board = piece.parentNode.parentNode;

    const x = e.clientX - piece.parentNode.offsetLeft - piece.offsetWidth / 2;
    const y = e.clientY - piece.parentNode.offsetTop - piece.offsetHeight / 2;
    if (board.offsetWidth < e.clientX - board.offsetLeft || e.clientX - board.offsetLeft < 0) {
      piece.style.position = "relative";
      piece.style.left = "0px";
      piece.style.top = "0px";
      selectedPieceRef.current = null;
      setCurrentPiece({ x: null, y: null, retouch: false });
    } else {
      piece.style.position = "absolute";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
    }
  };

  const letPiece = (e) => {
    if (
      selectedPieceRef.current == null ||
      !pieces.filter(
        (piece) => piece.x == currentPiece.x && piece.y == currentPiece.y && piece.color == playerTurnRef.current
      ).length
    )
      return;

    const piece = selectedPieceRef.current;
    const chessboard = chessboardRef.current;

    if (e.nativeEvent.button == 0) {
      const row = Math.floor((e.clientY - chessboard.offsetTop) / piece.offsetHeight);
      const col = Math.floor((e.clientX - chessboard.offsetLeft) / piece.offsetWidth);
      if (legalMovesRef.current.filter((move) => move.x == col && move.y == row).length == 0) {
        piece.style.position = "relative";
        piece.style.left = "0px";
        piece.style.top = "0px";
      } else if (row == currentPiece.y && col == currentPiece.x) {
        piece.style.position = "relative";
        piece.style.left = "0px";
        piece.style.top = "0px";
        if (currentPiece.retouch == true) {
          setCurrentPiece({ x: null, y: null, retouch: false });
          setLegalMoves([]);
        }
      } else if (row < 8 && col < 8 && row >= 0 && col >= 0) {
        const index = pieces.findIndex((piece) => piece.x == col && piece.y == row);
        if (index != -1) {
          pieces.splice(index, 1);
          //to be added in captured pieces
          soundsRef.current[2].play();
        } else {
          soundsRef.current[0].play();
        }
        setPieces((value) => {
          const _pieces = value.map((piece) => {
            if (piece.x == currentPiece.x && piece.y == currentPiece.y) {
              piece.x = col;
              piece.y = row;
            }
            return piece;
          });
          return _pieces;
        });

        setLastMove([
          { x: currentPiece.x, y: currentPiece.y },
          { x: col, y: row },
        ]);
        setCurrentPiece({ x: null, y: null, retouch: false });
        setLegalMoves([]);
        playerTurnRef.current == "white" ? (playerTurnRef.current = "black") : (playerTurnRef.current = "white");
      } else {
        piece.style.position = "relative";
        piece.style.left = "0px";
        piece.style.top = "0px";
      }
    } else if (e.nativeEvent.button == 2) {
      piece.style.position = "relative";
      piece.style.left = "0px";
      piece.style.top = "0px";
      setCurrentPiece({ x: null, y: null, retouch: false });
      setLegalMoves([]);
    }

    selectedPieceRef.current = null;
  };

  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const board = [];

  const soundsRef = useRef(null);
  const chessboardRef = useRef(null);
  const legalMovesRef = useRef(null);
  const selectedPieceRef = useRef(null);
  const playerTurnRef = useRef("white");

  const [capturedPieces, setCapturedPieces] = useState([]);
  const [legalMoves, setLegalMoves] = useState([]);
  const [pieces, setPieces] = useState(addPieces());
  const [currentPiece, setCurrentPiece] = useState({ x: null, y: null, retouch: false });
  const [lastMove, setLastMove] = useState([
    { x: null, y: null },
    { x: null, y: null },
  ]);

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
