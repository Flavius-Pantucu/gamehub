import Square from "./square";
import React, { useState } from "react";

export default function TicTacToe(props) {
  const [blockStates, setBlockStates] = useState(new Array(9));
  const [move, setMove] = useState("x");
  const [turn, setTurn] = useState(1);

  const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8] 
      ]

  function chooseBlock(block) {
    if (blockStates[block] != undefined) return;

    blockStates[block] = move;
    setBlockStates((blockStates) => [...blockStates]);
    setTurn(turn + 1);
    move == "x" ? setMove("o") : setMove("x");
    
    const result = checkEndgame(move, turn);
    if (result != null) {
      alert(result);
      restartGame();
    }
  }

  function checkEndgame(player, turn){
    var result = null;
    
    winConditions.forEach(condition => {
      if(condition.every(index => blockStates[index] == player)){
        result = player + " won!";
      }
    }, result);
    
    if (turn == 9)
      result = "draw!";

    return result;
  }

  function restartGame(){
    setBlockStates(new Array(9));
    setMove("x");
    setTurn(1);
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
