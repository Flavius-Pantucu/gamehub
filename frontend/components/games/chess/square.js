import { useState, useEffect } from 'react';

export default function Square(props) {
  const [oldPosition, newPosition] = props.lastMove;
  const [xAxis, yAxis] = props.axis;
  const [i, j] = props.coords;

  const currentPiece = props.currentPiece;
  const image = props.image;
  
  const [mark, setMark] = useState(false);

  useEffect(() => {
    setMark(false);
  },[currentPiece])

  return (
    <div
      onContextMenu={() => setMark(!mark)}
      className={`relative flex justify-center items-center
      ${
        (i + j) % 2 == 1
          ? "bg-[#f0d9b5] text-[#b58863]"
          : "bg-[#b58863] text-[#f0d9b5]"
      }
      ${
        currentPiece.y == i && currentPiece.x == j 
          ? (i + j) % 2 == 1 ? "bg-[#dcb274]" : "bg-[#ba7d4a]" 
          : ""
      }
      ${
        oldPosition.y == i && oldPosition.x == j 
          ? (i + j) % 2 == 1 ? "bg-[#dcb274]" : "bg-[#ba7d4a]" 
          : ""
      }
      ${
        newPosition.y == i && newPosition.x == j 
          ? (i + j) % 2 == 1 ? "bg-[#dcb274]" : "bg-[#ba7d4a]" 
          : ""
      }
      `}>
      {image && (
        <div style={{ backgroundImage: `url(${image})` }} className={`piece w-full h-full z-20`}>
          {mark && (
            <div className={`mark w-full h-full z-30 rounded-full absolute border-[6px] border-lime-700/60`}></div>
          )}
        </div>
      )}
      {i == 7 ? (
        <div className="absolute ml-1 bottom-0 left-0 text-xs md:text-sm">
          {xAxis[j]}
        </div>
      ) : (
        ""
      )}
      {j == 7 ? (
        <div className="absolute mr-1 top-0 right-0 text-xs md:text-sm">
          {yAxis[i]}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
