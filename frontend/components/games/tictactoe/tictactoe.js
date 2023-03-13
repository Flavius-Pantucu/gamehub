import Square from "./square";
import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";

export default function TicTacToe(props) {
  const [blockStates, setBlockStates] = useState(new Array(9));
  const [move, setMove] = useState("x");
  const [turn, setTurn] = useState(1);
  const [score, setScore] = useState({ x: 0, tie: 0, y: 0 });
  const [gameState, setGameState] = useState(true);
  const [gameMode, setGameMode] = useState("computer");

  const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  useEffect(() => {
    setTimeout(() => generateComputerMove(), 300);
  });

  function chooseGameMode(gameMode) {
    setGameMode(gameMode);
    setScore({ x: 0, y: 0, tie: 0 });
    restartGame();
  }

  function chooseBlock(block) {
    if (gameState == false) {
      restartGame();
      return;
    }

    if (blockStates[block] != undefined) return;

    blockStates[block] = move;
    setBlockStates((blockStates) => [...blockStates]);
    setTurn(turn + 1);
    move == "x" ? setMove("o") : setMove("x");

    const status = checkEndgame(move, turn);
    if (status.result === null) return;

    if (status.result === "draw") score.tie += 1;
    else if (status.result === "won")
      status.player === "x" ? (score.x += 1) : (score.y += 1);
    else return;

    setScore(score);
    setGameState(false);
  }

  function checkEndgame(player, turn) {
    var status = { player: null, result: null };

    winConditions.forEach((condition) => {
      if (condition.every((index) => blockStates[index] == player)) {
        status.player = player;
        status.result = "won";
      }
    }, status);

    if (turn == 9 && status.result != "won") status.result = "draw";

    return status;
  }

  function restartGame() {
    setBlockStates(new Array(9));
    setGameState(true);
    setMove((score.x + score.y + score.tie) % 2 ? "o" : "x");
    setTurn(1);
  }

  function generateComputerMove() {
    if (move != "o" || gameMode != "computer" || gameState == false) return;

    var randblock = Math.floor(Math.random() * 9);
    while (blockStates[randblock] != undefined) {
      randblock = Math.floor(Math.random() * 9);
    }
    chooseBlock(randblock);
  }

  return (
    <div className="mt-6 mx-auto w-4/5 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-2xl text-white">
        <Dropdown
          label="TicTacToe"
          inline="true"
          className="bg-slate-700 border-0 ml-4 mb-0 transition-opacity ease-in-out duration-500">
          <Dropdown.Item
            onClick={() => chooseGameMode("singleplayer")}
            className="text-white hover:bg-slate-500">
            Single-player (2P)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => chooseGameMode("computer")}
            className="text-white hover:bg-gray-500">
            Single-player (1P)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => chooseGameMode("multiplayer")}
            className="text-white hover:bg-gray-500">
            Multiplayer (online)
          </Dropdown.Item>
        </Dropdown>
      </h1>
      <div
        className={`flex justify-center mt-4" ${
          gameState == false ? "opacity-40" : ""
        } `}>
        <div className="grid grid-cols-3">
          <div
            onClick={() => chooseBlock(0)}
            className="flex w-32 h-32 items-center justify-center border-r-2 border-b-2 cursor-pointer">
            <Square state={blockStates[0]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(1)}
            className="flex w-32 h-32 items-center justify-center border-r-2 border-l-2 border-b-2 cursor-pointer">
            <Square state={blockStates[1]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(2)}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-b-2 cursor-pointer">
            <Square state={blockStates[2]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(3)}
            className="flex w-32 h-32 items-center justify-center border-t-2 border-r-2 border-b-2 cursor-pointer">
            <Square state={blockStates[3]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(4)}
            className="flex w-32 h-32 items-center justify-center border-2 cursor-pointer">
            <Square state={blockStates[4]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(5)}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-t-2 border-b-2 cursor-pointer">
            <Square state={blockStates[5]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(6)}
            className="flex w-32 h-32 items-center justify-center border-t-2 border-r-2 cursor-pointer">
            <Square state={blockStates[6]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(7)}
            className="flex w-32 h-32 items-center justify-center border-t-2 border-l-2 border-r-2 cursor-pointer">
            <Square state={blockStates[7]}></Square>
          </div>
          <div
            onClick={() => chooseBlock(8)}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-t-2 cursor-pointer">
            <Square state={blockStates[8]}></Square>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 text-white">
        <div className="grid grid-cols-3 gap-y-1">
          <div className="flex w-32 items-center justify-center">Player X</div>
          <div className="flex w-32 items-center justify-center">Tie</div>
          <div className="flex w-32 items-center justify-center">
            Player O {gameMode == "computer" ? "(AI)" : ""}
          </div>
          <div className="flex w-32 items-center justify-center">{score.x}</div>
          <div className="flex w-32 items-center justify-center">
            {score.tie}
          </div>
          <div className="flex w-32 items-center justify-center">{score.y}</div>
        </div>
      </div>
    </div>
  );
}
