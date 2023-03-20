import { Fragment, useRef, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import SudokuSquare from "./sudoku-square";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

class Cell {
  constructor(original, value, status) {
    this.original = original;
    this.value = value;
    this.status = status;
  }
}

export default function Sudoku(props) {
  const createGrid = () => {
    var grid = new Array(9);
    for (var i = 0; i < 9; i++) grid[i] = new Array(9);
    return [
      [
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 7, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 1, null),
        new Cell(false, null, null),
      ],
      [
        new Cell(false, null, null),
        new Cell(true, 9, null),
        new Cell(false, null, null),
        new Cell(true, 1, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
      ],
      [
        new Cell(true, 5, null),
        new Cell(true, 2, null),
        new Cell(true, 1, null),
        new Cell(true, 6, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 9, null),
        new Cell(false, null, null),
        new Cell(true, 7, null),
      ],
      [
        new Cell(true, 5, null),
        new Cell(true, 4, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 3, null),
        new Cell(true, 7, null),
        new Cell(true, 6, null),
      ],
      [
        new Cell(true, 2, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 5, null),
        new Cell(true, 3, null),
        new Cell(true, 9, null),
        new Cell(true, 8, null),
        new Cell(false, null, null),
      ],
      [
        new Cell(true, 1, null),
        new Cell(true, 9, null),
        new Cell(false, null, null),
        new Cell(true, 7, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 4, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
      ],
      [
        new Cell(false, null, null),
        new Cell(true, 5, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 1, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 4, null),
      ],
      [
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(true, 6, null),
        new Cell(true, 8, null),
        new Cell(true, 2, null),
        new Cell(true, 4, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
      ],
      [
        new Cell(true, 8, null),
        new Cell(true, 4, null),
        new Cell(false, null, null),
        new Cell(true, 3, null),
        new Cell(false, null, null),
        new Cell(true, 5, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
        new Cell(false, null, null),
      ],
    ];
  };

  const copyGrid = () => {
    var copy = [];
    for (var i = 0; i < grid.length; i++) {
      var square = [];
      for (var j = 0; j < grid[i].length; j++) {
        square.push(
          new Cell(grid[i][j].original, grid[i][j].value, grid[i][j].status)
        );
      }
      copy.push(square);
    }
    return copy;
  };

  const selectCell = (cell, square, row, col, val) => {
    if (cell == null || square == null || row == null || col == null) return;

    setCurrentElement({
      currentCell: cell,
      currentSquare: square,
      currentRow: row,
      currentColumn: col,
      currentValue: val,
    });
  };

  const fillCell = (event) => {
    if (
      currentElement.currentSquare == null ||
      currentElement.currentCell == null ||
      currentElement.currentRow == null ||
      currentElement.currentColumn == null
    )
      return;
    if (
      grid[currentElement.currentSquare - 1][currentElement.currentCell - 1]
        .original == true
    )
      return;
    const number = parseInt(event.key);
    if (isNaN(number)) return;
    grid[currentElement.currentSquare - 1][
      currentElement.currentCell - 1
    ].value = number;
    setGrid([...grid]);

    currentElement.currentValue = number;
    setCurrentElement(currentElement);

    movesList.current.push(copyGrid());
    checkPosition(currentElement);
  };

  const insertValue = (value) => {
    if (
      currentElement.currentSquare == null ||
      currentElement.currentCell == null ||
      currentElement.currentRow == null ||
      currentElement.currentColumn == null
    )
      return;
    if (
      grid[currentElement.currentSquare - 1][currentElement.currentCell - 1]
        .original == true
    )
      return;
    if (isNaN(parseInt(value))) return;
    if (value < 0 || value > 9) return;
    grid[currentElement.currentSquare - 1][
      currentElement.currentCell - 1
    ].value = value;
    setGrid([...grid]);

    currentElement.currentValue = value;
    setCurrentElement(currentElement);

    movesList.current.push(copyGrid());
    checkPosition(currentElement);
  };

  const checkPosition = () => {
    // grid[currentElement.currentSquare - 1].forEach((cell, index, square) => {
    //   var currentValue =
    //     grid[currentElement.currentSquare - 1][currentElement.currentCell - 1]
    //       .value;
    //   if (
    //     cell.value == currentValue &&
    //     index != currentElement.currentCell - 1
    //   ) {
    //     square[currentElement.currentCell - 1].status = "error";
    //     square[index].status = "error";
    //   }
    // });
  };

  const startTimer = () => {
    setInterval(() => {
      timer.second += 1;
      if (timer.second == 60) {
        timer.second = 0;
        timer.minute += 1;
      }
      if (timer.minute == 60) {
        timer.minute = 0;
        timer.hour += 1;
      }

      setTimer({
        hour: timer.hour,
        minute: timer.minute,
        second: timer.second,
      });
    }, 1000);
  };

  const showTime = () => {
    const hour =
      timer.hour <= 9 ? "0" + timer.hour.toString() : timer.hour.toString();
    const minute =
      timer.minute <= 9
        ? "0" + timer.minute.toString()
        : timer.minute.toString();
    const second =
      timer.second <= 9
        ? "0" + timer.second.toString()
        : timer.second.toString();
    const time =
      hour == "00" ? minute + ":" + second : hour + ":" + minute + ":" + second;
    return time;
  };

  const undoMove = () => {
    if (movesList.current.length != 1) movesList.current.pop();

    const previousState = movesList.current[movesList.current.length - 1];
    setGrid([...previousState]);
  };

  const eraseValue = () => {
    if (
      currentElement.currentSquare == null ||
      currentElement.currentCell == null ||
      currentElement.currentRow == null ||
      currentElement.currentColumn == null
    )
      return;
    if (
      grid[currentElement.currentSquare - 1][currentElement.currentCell - 1]
        .original == true
    )
      return;
    if (
      grid[currentElement.currentSquare - 1][currentElement.currentCell - 1]
        .value == null
    )
      return;
    grid[currentElement.currentSquare - 1][
      currentElement.currentCell - 1
    ].value = null;
    setGrid([...grid]);

    currentElement.currentValue = null;
    setCurrentElement(currentElement);

    movesList.current.push(copyGrid());
  };

  const theme = props.theme;

  const [currentElement, setCurrentElement] = useState({
    currentCell: null,
    currentSquare: null,
    currentRow: null,
    currentColumn: null,
    currentValue: null,
  });
  const [difficulty, setDifficulty] = useState("Easy");
  const [timer, setTimer] = useState({ hour: 0, minute: 0, second: 0 });
  const [grid, setGrid] = useState(createGrid());

  const movesList = useRef([copyGrid()]);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", fillCell);
    return () => {
      document.removeEventListener("keyup", fillCell);
    };
  }, [currentElement]);

  return (
    <div className="mx-auto h-5/6 w-full lg:w-5/6 max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button
            className={` inline-flex text-2xl transition-all ease-in duration-300 ${
              theme == "dark" ? "text-white" : "text-neutral-900"
            }`}>
            Sudoku
            <ChevronDownIcon className="ml-2 mt-2 h-5 w-5" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-in-out duration-300"
          enterFrom="transform opacity-0 scale-0"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in-out duration-300"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-0">
          <Menu.Items
            className={`absolute left-0 mt-2 ml-4 w-40 origin-top rounded-md shadow ${
              theme == "dark" ? "bg-slate-800" : "bg-slate-100"
            }`}>
            <Menu.Item
              onClick={() => setDifficulty("Easy")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Easy</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => setDifficulty("Medium")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Medium</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => setDifficulty("Hard")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Hard</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => setDifficulty("Extreme")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Extreme</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => setDifficulty("Evil")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Evil</button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="flex lg:h-5/6 lg:mt-0 mt-8 h-4/6 justify-center">
        <div className="grid lg:grid-cols-5 grid-cols-1">
          <div className="lg:col-span-5 col-span-1 h-8 self-end">
            <div className="flex w-full justify-between">
              <div className="flex">
                <h1
                  className={`text-md font-mono transition-all ease-in duration-200 ${
                    theme == "dark" ? "text-white/60" : "text-neutral-600/60"
                  }`}>
                  Difficulty:
                </h1>
                <h1
                  className={`text-md font-mono ml-3 transition-all ease-in duration-200 ${
                    theme == "dark" ? "text-cyan-500" : "text-cyan-600"
                  }`}>
                  {difficulty}
                </h1>
              </div>
              <div
                className={`text-md font-mono transition-all ease-in duration-200 ${
                  theme == "dark" ? "text-white/60" : "text-neutral-600/60"
                }`}>
                {showTime()}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-1 grid grid-cols-3 self-start justify-self-start">
            <div
              className={`flex border-l-2 border-t-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={1}
                cells={grid[0]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-l-2 border-t-2 border-r-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={2}
                cells={grid[1]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-t-2 border-r-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={3}
                cells={grid[2]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-l-2 border-t-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={4}
                cells={grid[3]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={5}
                cells={grid[4]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-t-2 border-r-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer 
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={6}
                cells={grid[5]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-l-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={7}
                cells={grid[6]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-l-2 border-r-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={8}
                cells={grid[7]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
            <div
              className={`flex border-r-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-40 sm:h-36 2xl:w-48 xl:w-44 lg:w-40 md:w-40 sm:w-36 w-32 h-32 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
              <SudokuSquare
                theme={theme}
                square={9}
                cells={grid[8]}
                selectCell={selectCell}
                current={[
                  currentElement.currentCell,
                  currentElement.currentSquare,
                  currentElement.currentRow,
                  currentElement.currentColumn,
                  currentElement.currentValue,
                ]}></SudokuSquare>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-1 text-white lg:justify-self-end justify-self-center self-start">
            <div className="flex flex-col lg:gap-y-6 2xl:gap-y-4 gap-y-1 lg:ml-4 lg:mt-0 mt-3">
              <div className="grid grid-cols-4 justify-items-center content-center mb-4 lg:mb-0 lg:order-1 order-2 h-20 2xl:w-96 xl:w-80 lg:w-72 md:w-[480px] sm:w-[432px] w-[384px] transition-all ease-in duration-200">
                <div
                  className={`flex justify-center items-center bg-gray-300/20 rounded-full lg:w-16 xl:w-16 2xl:w-20 w-20 aspect-square cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Hint
                </div>
                <div
                  className={`flex justify-center items-center bg-gray-300/20 rounded-full lg:w-16 xl:w-16 2xl:w-20 w-20 aspect-square cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Notes
                </div>
                <div
                  onClick={() => eraseValue()}
                  className={`flex justify-center items-center bg-gray-300/20 rounded-full lg:w-16 xl:w-16 2xl:w-20 w-20 aspect-square cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Erase
                </div>
                <div
                  onClick={() => undoMove()}
                  className={`flex justify-center items-center bg-gray-300/20 rounded-full lg:w-16 xl:w-16 2xl:w-20 w-20 aspect-square cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Undo
                </div>
              </div>
              <div className="lg:order-2 order-1 2xl:h-96 xl:h-80 lg:h-72 2xl:w-96 h-20 xl:w-80 lg:w-72 md:w-[480px] sm:w-[432px] w-[384px] transition-all ease-in duration-200 ">
                <div className="grid grid-cols-9 lg:grid-cols-3 lg:grid-rows-3 lg:gap-2 h-full content-center items-center">
                  <div
                    onClick={() => insertValue(1)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    1
                  </div>
                  <div
                    onClick={() => insertValue(2)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    2
                  </div>
                  <div
                    onClick={() => insertValue(3)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    3
                  </div>
                  <div
                    onClick={() => insertValue(4)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    4
                  </div>
                  <div
                    onClick={() => insertValue(5)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    5
                  </div>
                  <div
                    onClick={() => insertValue(6)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    6
                  </div>
                  <div
                    onClick={() => insertValue(7)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    7
                  </div>
                  <div
                    onClick={() => insertValue(8)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    8
                  </div>
                  <div
                    onClick={() => insertValue(9)}
                    className={`transition-colors ease-in-out duration-300 flex justify-center text-cyan-500 hover:text-cyan-600 items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? " lg:bg-cyan-500 hover:lg:bg-cyan-600 lg:text-white hover:lg:text-white"
                        : " lg:bg-gray-300/20 hover:lg:bg-gray-300/40"
                    } `}>
                    9
                  </div>
                </div>
              </div>
              <div className="hidden order-3 lg:grid grid-cols-2 content-center 2xl:h-20 xl:h-20 lg:h-16 2xl:w-96 xl:w-80 lg:w-72 border rounded transition-all ease-in duration-200 ">
                <div
                  className={`flex justify-center font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  New game
                </div>
                <div
                  className={`flex justify-center font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Reset game
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
