import Image from "next/image";
import Square from "./square";
import React, { useState } from "react";
import ReactCSSTransitionGroup from "react-transition-group";

export default function TicTacToe(props) {
  const [blockStates, setBlockStates] = useState(new Array(9));
  const [move, setMove] = useState("x");
  const [turn, setTurn] = useState(1);

  function chooseBlock(block) {
    if (blockStates[block] != undefined) return;
    blockStates[block] = move;
    setBlockStates((blockStates) => [...blockStates]);
    setTurn(turn + 1);
    if (turn == 9) {
      setBlockStates(new Array(9));
      setMove("x");
      setTurn(1);
      return;
    }
    move == "x" ? setMove("o") : setMove("x");
  }

  return (
    <div className="mt-10 mx-auto w-4/5 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-white">TicTacToe</h1>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-3">
          <div
            onClick={() => chooseBlock(0)}
            className="flex w-32 h-32 items-center justify-center border-r-2 border-b-2 text-white cursor-pointer">
            <Square state={blockStates[0]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(1)}
            className="flex w-32 h-32 items-center justify-center border-r-2 border-l-2 border-b-2 text-white cursor-pointer">
            <Square state={blockStates[1]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(2)}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-b-2 text-white cursor-pointer">
            <Square state={blockStates[2]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(3)}
            className="flex w-32 h-32 items-center justify-center border-t-2 border-r-2 border-b-2 text-white cursor-pointer">
            <Square state={blockStates[3]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(4)}
            className="flex w-32 h-32 items-center justify-center border-2 text-white cursor-pointer">
            <Square state={blockStates[4]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(5)}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-t-2 border-b-2 text-white cursor-pointer">
            <Square state={blockStates[5]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(6)}
            className="flex w-32 h-32 items-center justify-center border-t-2 border-r-2 text-white cursor-pointer">
            <Square state={blockStates[6]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(7)}
            className="flex w-32 h-32 items-center justify-center border-t-2 border-l-2 border-r-2 text-white cursor-pointer">
            <Square state={blockStates[7]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(8)}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-t-2 text-white cursor-pointer">
            <Square state={blockStates[8]}></Square>
          </div>
        </div>
      </div>
    </div>
  );
}
