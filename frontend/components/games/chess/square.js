import { useState, useEffect } from "react";

export default function Square(props) {
  const [oldPosition, newPosition] = props.lastMove;
  const [xAxis, yAxis] = props.axis;
  const [i, j] = props.coords;

  const currentPiece = props.currentPiece;
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
      ${currentPiece.y == i && currentPiece.x == j ? "bg-[#ef8b5d]" : ""}
      ${oldPosition.y == i && oldPosition.x == j ? "bg-[#b4ab47]" : ""}
      ${newPosition.y == i && newPosition.x == j ? "bg-[#b4ab47]" : ""}
      `}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`piece fill-current bg-no-repeat w-full h-full z-20`}></div>
      )}
      {mark && <div className={`mark w-full h-full rounded-full absolute border-[5px] border-[#b4ab47]`}></div>}
      {i == 7 ? <div className="absolute ml-1 bottom-0 left-0 text-xs md:text-sm">{xAxis[j]}</div> : ""}
      {j == 7 ? <div className="absolute mr-1 top-0 right-0 text-xs md:text-sm">{yAxis[i]}</div> : ""}
    </div>
  );
}
