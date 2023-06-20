import { useState, useEffect } from "react";

export default function Square(props) {
  const [oldPosition, newPosition] = props.lastMove;
  const [xAxis, yAxis] = props.axis;
  const [i, j] = props.coords;

  const currentPiece = props.currentPiece;
  const legalMoves = props.legalMoves;
  const image = props.image;

  const [mark, setMark] = useState(false);

  useEffect(() => {
    setMark(false);
  }, [currentPiece]);

  return (
    <div
      onContextMenu={() => {
        setMark(!mark);
      }}
      className={`p-0.5 relative flex justify-center items-center
      ${(i + j) % 2 == 1 ? "bg-[#f0d9b5] text-[#b58863]" : "bg-[#b58863] text-[#f0d9b5]"}
      ${currentPiece.y == i && currentPiece.x == j ? "bg-[#f99161]" : ""}
      ${
        !legalMoves.find((square) => square.x == j && square.y == i) && oldPosition.y == i && oldPosition.x == j
          ? "bg-[#aba34c]"
          : ""
      }
      ${
        !legalMoves.find((square) => square.x == j && square.y == i) && newPosition.y == i && newPosition.x == j
          ? "bg-[#c0b74c]"
          : ""
      }
      `}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`piece fill-current bg-no-repeat w-full h-full z-20`}></div>
      )}
      {mark && <div className={`mark w-full h-full rounded-full absolute border-[5px] border-[#b4ab47]`}></div>}
      {legalMoves.find((square) => square.x == j && square.y == i) && !image && (
        <div className="absolute w-1/4 h-1/4 rounded-full bg-[#f99161] opacity-80"></div>
      )}
      {legalMoves.find((square) => square.x == j && square.y == i) && image && (
        <div className="absolute w-full h-full opacity-80">
          <div className="absolute top-0 left-0 border-8 border-transparent border-l-[#f99161] border-t-[#f99161]"></div>
          <div className="absolute top-0 right-0 border-8 border-transparent border-r-[#f99161] border-t-[#f99161]"></div>
          <div className="absolute bottom-0 left-0 border-8 border-transparent border-l-[#f99161] border-b-[#f99161]"></div>
          <div className="absolute bottom-0 right-0 border-8 border-transparent border-r-[#f99161] border-b-[#f99161]"></div>
        </div>
      )}
      {i == 7 ? <div className="absolute ml-1 bottom-0 left-0 text-xs md:text-sm">{xAxis[j]}</div> : ""}
      {j == 7 ? <div className="absolute mr-1 top-0 right-0 text-xs md:text-sm">{yAxis[i]}</div> : ""}
    </div>
  );
}
