import { Fragment, useRef, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import SudokuSquare from "./sudoku-square";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Sudoku(props) {
  const [currentElement, setCurrentElement] = useState({
    currentCell: null,
    currentSquare: null,
    currentRow: null,
    currentColumn: null,
  });
  const [difficulty, setDifficulty] = useState("Easy");
  const [timer, setTimer] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", fillCell);
    return () => {
      document.removeEventListener("keyup", fillCell);
    };
  }, [currentElement]);

  const theme = props.theme;
  const movesList = useRef(new Array());

  const createGrid = () => {
    var grid = new Array(9);
    for (var i = 0; i < 9; i++) grid[i] = new Array(9);
    return grid;
  };
  const [grid, setGrid] = useState(createGrid());

  const copyGrid = () => {
    var copy = [];
    for (var i = 0; i < grid.length; i++) {
      copy.push(grid[i].map((x) => x));
    }
    return copy;
  };

  const selectCell = (cell, square, row, col) => {
    if (cell == null || square == null || row == null || col == null) return;

    setCurrentElement({
      currentCell: cell,
      currentSquare: square,
      currentRow: row,
      currentColumn: col,
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
    const number = parseInt(event.key);
    if (isNaN(number)) return;
    grid[currentElement.currentSquare - 1][currentElement.currentCell - 1] =
      number;
    setGrid([...grid]);

    movesList.current.push(copyGrid());
  };

  const insertValue = (value) => {
    if (
      currentElement.currentSquare == null ||
      currentElement.currentCell == null ||
      currentElement.currentRow == null ||
      currentElement.currentColumn == null
    )
      return;
    if (isNaN(parseInt(value))) return;
    if (value < 0 || value > 9) return;
    grid[currentElement.currentSquare - 1][currentElement.currentCell - 1] =
      value;
    setGrid([...grid]);

    movesList.current.push(copyGrid());
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
    if (movesList.current.length == 0) return;
    movesList.current.pop();
    const len = movesList.current.length;
    const previousState =
      len != 0 ? movesList.current[movesList.current.length - 1] : createGrid();
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
      grid[currentElement.currentSquare - 1][currentElement.currentCell - 1] ==
      null
    )
      return;
    grid[currentElement.currentSquare - 1][currentElement.currentCell - 1] =
      null;
    setGrid([...grid]);
  };

  const chooseDifficulty = (difficulty) => setDifficulty(difficulty);

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
              onClick={() => chooseDifficulty("Easy")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Easy</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => chooseDifficulty("Medium")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Medium</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => chooseDifficulty("Hard")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Hard</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => chooseDifficulty("Extreme")}
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Extreme</button>
            </Menu.Item>
            <Menu.Item
              onClick={() => chooseDifficulty("Evil")}
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
                ]}></SudokuSquare>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-1 text-white lg:justify-self-end justify-self-center self-start">
            <div className="flex flex-col lg:gap-y-6 gap-y-4 lg:ml-4 lg:mt-0 mt-4">
              <div className="grid grid-cols-4 content-center mb-4 lg:mb-0 lg:order-1 order-2 h-20 2xl:w-96 xl:w-80 lg:w-72 md:w-[480px] sm:w-[432px] w-[384px] border rounded transition-all ease-in duration-200">
                <div
                  className={`flex justify-center cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Hint
                </div>
                <div
                  className={`flex justify-center cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Notes
                </div>
                <div
                  onClick={() => eraseValue()}
                  className={`flex justify-center cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Erase
                </div>
                <div
                  onClick={() => undoMove()}
                  className={`flex justify-center cursor-pointer font-mono ${
                    theme == "dark" ? "text-gray-300" : "text-neutral-900"
                  }`}>
                  Undo
                </div>
              </div>
              <div className="lg:order-2 order-1 2xl:h-96 xl:h-80 lg:h-72 2xl:w-96 h-20 xl:w-80 lg:w-72 md:w-[480px] sm:w-[432px] w-[384px] transition-all ease-in duration-200 ">
                <div className="grid grid-cols-9 lg:grid-cols-3 lg:grid-rows-3 lg:gap-2 h-full content-center items-center">
                  <div
                    onClick={() => insertValue(1)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    1
                  </div>
                  <div
                    onClick={() => insertValue(2)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    2
                  </div>
                  <div
                    onClick={() => insertValue(3)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    3
                  </div>
                  <div
                    onClick={() => insertValue(4)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    4
                  </div>
                  <div
                    onClick={() => insertValue(5)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    5
                  </div>
                  <div
                    onClick={() => insertValue(6)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    6
                  </div>
                  <div
                    onClick={() => insertValue(7)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    7
                  </div>
                  <div
                    onClick={() => insertValue(8)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
                    } `}>
                    8
                  </div>
                  <div
                    onClick={() => insertValue(9)}
                    className={`flex justify-center items-center font-mono text-5xl cursor-pointer lg:rounded h-full w-full ${
                      theme == "dark"
                        ? "text-cyan-500 lg:bg-cyan-500 lg:text-white"
                        : "text-cyan-600 lg:bg-gray-400/30"
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
