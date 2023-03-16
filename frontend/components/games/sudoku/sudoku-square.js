import { useEffect, useState } from "react";

export default function SudokuSquare(props) {
  const [currentCell, currentSquare, currentRow, currentColumn] = props.current;
  const square = props.square;
  const theme = props.theme;
  const cells = props.cells;

  const selectCell = (cell) => {
    const column = 3 * ((square - 1) % 3) + (((cell - 1) % 3) + 1);
    const row =
      3 * Math.floor((square - 1) / 3) + (Math.floor((cell - 1) / 3) + 1);
    props.selectCell(cell, square, row, column);
  };

  const getCoords = () => {
    var aux = [];
    for (var i = 1; i <= 3; i++) {
      for (var j = 1; j <= 3; j++) {
        var cell = 3 * (i - 1) + ((j - 1) % 3) + 1;
        var column = 3 * ((square - 1) % 3) + (((cell - 1) % 3) + 1);
        var row =
          3 * Math.floor((square - 1) / 3) + (Math.floor((cell - 1) / 3) + 1);
        aux.push({ row: row, column: column });
      }
    }
    return aux;
  };
  const coords = getCoords();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
        <div
          onClick={() => selectCell(1)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square
              ? currentCell == 1
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[0].row || currentColumn == coords[0].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[0]}
        </div>
        <div
          onClick={() => selectCell(2)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-x ${
            theme == "dark"
              ? "text-white/70 border-x-gray-200/30"
              : "text-neutral-900 border-x-gray-500/50"
          } ${
            currentSquare == square
              ? currentCell == 2
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[1].row || currentColumn == coords[1].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }`}>
          {cells[1]}
        </div>
        <div
          onClick={() => selectCell(3)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square
              ? currentCell == 3
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[2].row || currentColumn == coords[2].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[2]}
        </div>
        <div
          onClick={() => selectCell(4)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-y ${
            theme == "dark"
              ? "text-white/70 border-y-gray-200/30"
              : "text-neutral-900 border-y-gray-500/50"
          } ${
            currentSquare == square
              ? currentCell == 4
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[3].row || currentColumn == coords[3].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[3]}
        </div>
        <div
          onClick={() => selectCell(5)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border ${
            theme == "dark"
              ? "text-white/70 border-gray-200/30"
              : "text-neutral-900 border-gray-500/50"
          } ${
            currentSquare == square
              ? currentCell == 5
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[4].row || currentColumn == coords[4].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[4]}
        </div>
        <div
          onClick={() => selectCell(6)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-y ${
            theme == "dark"
              ? "text-white/70 border-y-gray-200/30"
              : "text-neutral-900 border-y-gray-500/50"
          } ${
            currentSquare == square
              ? currentCell == 6
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[5].row || currentColumn == coords[5].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[5]}
        </div>
        <div
          onClick={() => selectCell(7)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square
              ? currentCell == 7
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[6].row || currentColumn == coords[6].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[6]}
        </div>
        <div
          onClick={() => selectCell(8)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default border-x ${
            theme == "dark"
              ? "text-white/70 border-x-gray-200/30"
              : "text-neutral-900 border-x-gray-500/50"
          } ${
            currentSquare == square
              ? currentCell == 8
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[7].row || currentColumn == coords[7].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[7]}
        </div>
        <div
          onClick={() => selectCell(9)}
          className={`flex text-3xl items-center justify-center transition-all ease-in duration-75 cursor-default ${
            theme == "dark" ? "text-white/70" : "text-neutral-900"
          } ${
            currentSquare == square
              ? currentCell == 9
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : currentRow == coords[8].row || currentColumn == coords[8].column
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          } `}>
          {cells[8]}
        </div>
      </div>
    </div>
  );
}
