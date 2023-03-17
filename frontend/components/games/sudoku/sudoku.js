import { Fragment, useEffect, useState } from "react";
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

  const createGrid = () => {
    var grid = new Array(9);
    for (var i = 0; i < 9; i++) grid[i] = new Array(9);
    return grid;
  };
  const [grid, setGrid] = useState(createGrid());

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
    console.log(number);
    grid[currentElement.currentSquare - 1][currentElement.currentCell - 1] =
      number;
    setGrid([...grid]);
  };

  const insertValue = (value) => {
    if (
      currentElement.currentSquare == null ||
      currentElement.currentCell == null ||
      currentElement.currentRow == null ||
      currentElement.currentColumn == null
    )
      return;
    const val = Math.ceil(Math.random() * 9);
    grid[currentElement.currentSquare - 1][currentElement.currentCell - 1] =
      val;
    setGrid([...grid]);
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

  const chooseDifficulty = (difficulty) => setDifficulty(difficulty);

  return (
    <div className="mx-auto h-5/6 w-5/6 max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
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
      <div className="flex md:h-5/6 md:mt-0 md:gap-x-4 mt-8 h-4/6 gap-y-4 justify-center">
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
          <div className="col-span-3 grid grid-cols-3 self-start justify-self-start">
            <div
              className={`flex border-l-2 border-t-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer">
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
              className={`flex border-l-2 border-t-2 border-r-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer">
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
              className={`flex border-t-2 border-r-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer">
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
              className={`flex border-l-2 border-t-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer">
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
              className={`flex border-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer">
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
              className={`flex border-t-2 border-r-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer 
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
              className={`flex border-l-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer"
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
              className={`flex border-l-2 border-r-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer"
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
              className={`flex border-r-2 border-b-2 transition-all ease-in duration-200 2xl:h-48 xl:h-44 lg:h-40 md:h-36 sm:h-32 2xl:w-48 xl:w-44 lg:w-40 md:w-36 sm:w-32 w-28 h-28 items-center justify-center cursor-pointer"
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
          <div className="col-span-2 text-white lg:justify-self-end justify-self-center self-start">
            <div className="lg:flex hidden flex-col 2xl:gap-y-4 xl:gap-y-6 lg:gap-y-6 ml-4">
              <div className="2xl:h-20 xl:h-20 lg:h-20 md:h-16 sm:h-14 h-12 2xl:w-96 xl:w-80 lg:w-72 border rounded transition-all ease-in duration-200 "></div>
              <div className="2xl:h-96 xl:h-80 lg:h-72 md:h-64 sm:h-64 h-60 2xl:w-96 xl:w-80 lg:w-72 border rounded transition-all ease-in duration-200 "></div>
              <div className="2xl:h-20 xl:h-20 lg:h-16 md:h-16 sm:h-14 h-12 2xl:w-96 xl:w-80 lg:w-72 border rounded transition-all ease-in duration-200 "></div>
            </div>
            <div className="lg:hidden h-20 sm:w-96 w-72 border rounded mt-1 transition-all ease-in duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
