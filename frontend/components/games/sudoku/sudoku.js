import { useState } from "react";
import { Menu } from "@headlessui/react";
import SudokuSquare from "./sudoku-square";

export default function Sudoku(props) {
  const [currentSquare, setCurrentSquare] = useState(null);
  const [currentCell, setCurrentCell] = useState(null);

  const theme = props.theme;
  const selectCell = (cell, square) => {
    setCurrentCell(cell), setCurrentSquare(square);
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
          </Menu.Button>
        </div>
      </Menu>
      <div className="flex h-5/6 justify-center mt-4 gap-x-4">
        <div className="grid grid-cols-3 self-center">
          <div
            className={`flex border-l-2 border-t-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={1}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-t-2 border-r-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={2}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-t-2 border-r-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={3}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-t-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={4}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={5}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-t-2 border-r-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer 
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={6}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={7}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-l-2 border-r-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={8}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
          <div
            className={`flex border-r-2 border-b-2 transition-all ease-in duration-200 xl:h-36 md:h-28 sm:h-20 xl:w-36 md:w-28 sm:w-20 w-16 h-16 items-center justify-center cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <SudokuSquare
              theme={theme}
              square={9}
              selectCell={selectCell}
              currentCell={[currentCell, currentSquare]}></SudokuSquare>
          </div>
        </div>
        <div className="text-white">Second div for actions</div>
      </div>
    </div>
  );
}
