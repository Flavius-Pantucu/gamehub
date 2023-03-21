export default function SudokuSquare(props) {
  const selectCell = (cell) => {
    const column = 3 * (square % 3) + (cell % 3);
    const row = 3 * Math.floor(square / 3) + Math.floor(cell / 3);
    props.selectCell(cell, square, row, column, cells[cell].value);
  };

  const getCoords = () => {
    var aux = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var cell = 3 * i + j;
        var column = 3 * (square % 3) + (cell % 3);
        var row = 3 * Math.floor(square / 3) + Math.floor(cell / 3);
        aux.push({ row: row, column: column });
      }
    }
    return aux;
  };

  const [currentCell, currentSquare, currentRow, currentColumn, currentValue] =
    props.current;
  const square = props.square;
  const theme = props.theme;
  const cells = props.cells;
  const coords = getCoords();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
        <div
          onClick={() => selectCell(0)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default 
          ${
            cells[0].status == "error"
              ? "text-red-700"
              : cells[0].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          } 
          ${
            currentSquare == square
              ? currentCell == 0
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[0].row ||
                  currentColumn == coords[0].column) &&
                (currentValue != cells[0].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[0].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[0].value}
        </div>
        <div
          onClick={() => selectCell(1)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default border-x 
          ${
            cells[1].status == "error"
              ? "text-red-700"
              : cells[1].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${theme == "dark" ? "border-x-gray-200/30" : "border-x-gray-500/50"} 
          ${
            currentSquare == square
              ? currentCell == 1
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[1].row ||
                  currentColumn == coords[1].column) &&
                (currentValue != cells[1].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[1].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[1].value}
        </div>
        <div
          onClick={() => selectCell(2)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default 
          ${
            cells[2].status == "error"
              ? "text-red-700"
              : cells[2].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${
            currentSquare == square
              ? currentCell == 2
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[2].row ||
                  currentColumn == coords[2].column) &&
                (currentValue != cells[2].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[2].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[2].value}
        </div>
        <div
          onClick={() => selectCell(3)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default border-y 
          ${
            cells[3].status == "error"
              ? "text-red-700"
              : cells[3].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${
            theme == "dark" ? "border-y-gray-200/30" : "border-y-gray-500/50"
          } ${
            currentSquare == square
              ? currentCell == 3
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[3].row ||
                  currentColumn == coords[3].column) &&
                (currentValue != cells[3].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[3].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[3].value}
        </div>
        <div
          onClick={() => selectCell(4)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default border
          ${
            cells[4].status == "error"
              ? "text-red-700"
              : cells[4].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${theme == "dark" ? "border-gray-200/30" : "border-gray-500/50"}
          ${
            currentSquare == square
              ? currentCell == 4
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[4].row ||
                  currentColumn == coords[4].column) &&
                (currentValue != cells[4].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[4].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[4].value}
        </div>
        <div
          onClick={() => selectCell(5)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default border-y 
          ${
            cells[5].status == "error"
              ? "text-red-700"
              : cells[5].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${theme == "dark" ? "border-y-gray-200/30" : "border-y-gray-500/50"} 
          ${
            currentSquare == square
              ? currentCell == 5
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[5].row ||
                  currentColumn == coords[5].column) &&
                (currentValue != cells[5].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[5].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[5].value}
        </div>
        <div
          onClick={() => selectCell(6)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default
            ${
              cells[6].status == "error"
                ? "text-red-700"
                : cells[6].original == false
                ? "text-cyan-500"
                : theme == "dark"
                ? "text-white/70"
                : "text-neutral-900"
            }
             ${
               currentSquare == square
                 ? currentCell == 6
                   ? theme == "dark"
                     ? "bg-gray-500/50"
                     : "bg-gray-400/30"
                   : theme == "dark"
                   ? "bg-gray-600/40"
                   : "bg-gray-300/40"
                 : (currentRow == coords[6].row ||
                     currentColumn == coords[6].column) &&
                   (currentValue != cells[6].value || currentValue == null)
                 ? theme == "dark"
                   ? "bg-gray-600/40"
                   : "bg-gray-300/40"
                 : ""
             }
             ${
               currentValue == cells[6].value && currentValue != null
                 ? theme == "dark"
                   ? "bg-gray-500/50"
                   : "bg-gray-400/30"
                 : ""
             }`}>
          {cells[6].value}
        </div>
        <div
          onClick={() => selectCell(7)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default border-x 
          ${
            cells[7].status == "error"
              ? "text-red-700"
              : cells[7].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${theme == "dark" ? "border-x-gray-200/30" : "border-x-gray-500/50"}  
          ${
            currentSquare == square
              ? currentCell == 7
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[7].row ||
                  currentColumn == coords[7].column) &&
                (currentValue != cells[7].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[7].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[7].value}
        </div>
        <div
          onClick={() => selectCell(8)}
          className={`flex text-3xl items-center justify-center transition-[border] ease-in duration-200 cursor-default
          ${
            cells[8].status == "error"
              ? "text-red-700"
              : cells[8].original == false
              ? "text-cyan-500"
              : theme == "dark"
              ? "text-white/70"
              : "text-neutral-900"
          }
          ${
            currentSquare == square
              ? currentCell == 8
                ? theme == "dark"
                  ? "bg-gray-500/50"
                  : "bg-gray-400/30"
                : theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : (currentRow == coords[8].row ||
                  currentColumn == coords[8].column) &&
                (currentValue != cells[8].value || currentValue == null)
              ? theme == "dark"
                ? "bg-gray-600/40"
                : "bg-gray-300/40"
              : ""
          }
          ${
            currentValue == cells[8].value && currentValue != null
              ? theme == "dark"
                ? "bg-gray-500/50"
                : "bg-gray-400/30"
              : ""
          }`}>
          {cells[8].value}
        </div>
      </div>
    </div>
  );
}
