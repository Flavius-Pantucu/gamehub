import { useEffect, useState } from "react";

export default function SudokuSquare(props) {
  const [cells, setCells] = useState(new Array(9));
  const [currentCell, currentSquare] = props.currentCell;
  const square = props.square;
  const theme = props.theme;

  const selectCell = (cell) => {
    props.selectCell(cell, square);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
        <div
          onClick={() => selectCell(1)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square && currentCell == 1 ? "bg-gray-700" : ""
          }`}>
          {cells[0]}
        </div>
        <div
          onClick={() => selectCell(2)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-x ${
            theme == "dark"
              ? "text-white/70 border-x-gray-200/30"
              : "text-neutral-900 border-x-gray-400/50"
          } ${
            currentSquare == square && currentCell == 2 ? "bg-gray-700" : ""
          }  `}>
          {cells[1]}
        </div>
        <div
          onClick={() => selectCell(3)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square && currentCell == 3 ? "bg-gray-700" : ""
          }`}>
          {cells[2]}
        </div>
        <div
          onClick={() => selectCell(4)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-y ${
            theme == "dark"
              ? "text-white/70 border-y-gray-200/30"
              : "text-neutral-900 border-y-gray-400/50"
          } ${
            currentSquare == square && currentCell == 4 ? "bg-gray-700" : ""
          }`}>
          {cells[3]}
        </div>
        <div
          onClick={() => selectCell(5)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border ${
            theme == "dark"
              ? "text-white/70 border-gray-200/30"
              : "text-neutral-900 border-gray-400/50"
          } ${
            currentSquare == square && currentCell == 5 ? "bg-gray-700" : ""
          } `}>
          {cells[4]}
        </div>
        <div
          onClick={() => selectCell(6)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-y ${
            theme == "dark"
              ? "text-white/70 border-y-gray-200/30"
              : "text-neutral-900 border-y-gray-400/50"
          } ${
            currentSquare == square && currentCell == 6 ? "bg-gray-700" : ""
          } `}>
          {cells[5]}
        </div>
        <div
          onClick={() => selectCell(7)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square && currentCell == 7 ? "bg-gray-700" : ""
          }`}>
          {cells[6]}
        </div>
        <div
          onClick={() => selectCell(8)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-x ${
            theme == "dark"
              ? "text-white/70 border-x-gray-200/30"
              : "text-neutral-900 border-x-gray-400/50"
          } ${
            currentSquare == square && currentCell == 8 ? "bg-gray-700" : ""
          } `}>
          {cells[7]}
        </div>
        <div
          onClick={() => selectCell(9)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square && currentCell == 9 ? "bg-gray-700" : ""
          }`}>
          {cells[8]}
        </div>
      </div>
    </div>
  );
}
