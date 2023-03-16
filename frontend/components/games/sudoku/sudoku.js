import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import SudokuSquare from "./sudoku-square";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Sudoku(props) {
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentSquare, setCurrentSquare] = useState(null);
  const [currentCell, setCurrentCell] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const theme = props.theme;

  const createGrid = () => {
    var grid = new Array(9);
    for (var i = 0; i < 9; i++) grid[i] = new Array(9);
    return grid;
  };
  const [grid, setGrid] = useState(createGrid());

  const selectCell = (cell, square, row, col) => {
    setCurrentCell(cell);
    setCurrentSquare(square);
    setCurrentRow(row);
    setCurrentColumn(col);
  };

  const insertValue = (value) => {
    const val = Math.ceil(Math.random() * 9);
    grid[currentSquare - 1][currentCell - 1] = val;
    setGrid([...grid]);
  };

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
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Easy</button>
            </Menu.Item>
            <Menu.Item
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Medium</button>
            </Menu.Item>
            <Menu.Item
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Hard</button>
            </Menu.Item>
            <Menu.Item
              className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                theme == "dark"
                  ? "text-white hover:bg-gray-700"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
              }`}>
              <button className="text-sm font-normal">Extreme</button>
            </Menu.Item>
            <Menu.Item
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
      <div className="flex h-5/6 justify-center mt-4 gap-x-4 md:flex-row flex-col">
        <div className="grid grid-cols-3 self-center">
          <div
            className={`flex border-l-2 border-t-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={1}
              cells={grid[0]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-t-2 border-r-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={2}
              cells={grid[1]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-t-2 border-r-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={3}
              cells={grid[2]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-t-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={4}
              cells={grid[3]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={5}
              cells={grid[4]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-t-2 border-r-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer 
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={6}
              cells={grid[5]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={7}
              cells={grid[6]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-r-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={8}
              cells={grid[7]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
          <div
            className={`flex border-r-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 xl:w-36 md:w-28 w-28 h-28 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={9}
              cells={grid[8]}
              selectCell={selectCell}
              current={[
                currentCell,
                currentSquare,
                currentRow,
                currentColumn,
              ]}></SudokuSquare>
          </div>
        </div>
        <div className="text-white self-center">
          Second div for actions{" "}
          <button onClick={() => insertValue(0)}>random</button>
        </div>
      </div>
    </div>
  );
}
