import Square from "./square";
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "flowbite-react";

export default function TicTacToe(props) {
  var computerMove = useRef(false);
  var move = useRef("x");
  var turn = useRef(0);

  const [toast, setToast] = useState({ type: null, message: null });
  const [blockStates, setBlockStates] = useState(new Array(9));
  const [score, setScore] = useState({ x: 0, tie: 0, y: 0 });
  const [gameMode, setGameMode] = useState("computer");
  const [gameState, setGameState] = useState(true);

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
    toast.type != null
      ? setTimeout(() => setToast({ type: null, message: null }), 2500)
      : "";
  }, [toast]);

  useEffect(() => {
    if (move.current == "o" && gameMode == "computer" && gameState != false) {
      computerMove.current = true;
      setTimeout(() => {
        var block = generateComputerMove();
        computerMove.current = false;
        chooseBlock(block);
      }, 500);
    }
  }, [move.current]);

  function chooseGameMode(gameMode) {
    setGameMode(gameMode);
    setScore({ x: 0, y: 0, tie: 0 });
    restartGame();
  }

  function chooseBlock(block) {
    if (computerMove.current == true) return;
    if (gameState == false) {
      restartGame();
      return;
    }

    if (blockStates[block] != undefined) return;
    blockStates[block] = move.current;
    setBlockStates((blockStates) => [...blockStates]);
    turn.current += 1;

    const status = checkEndgame(move.current, turn.current);
    if (status.result == null) {
      move.current == "x" ? (move.current = "o") : (move.current = "x");
      return;
    }

    setToast({ type: "success", message: "Tap the board to start a new game" });

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
    move.current = (score.x + score.y + score.tie) % 2 ? "o" : "x";
    turn.current = 1;
  }

  function generateComputerMove() {
    if (move.current != "o" || gameMode != "computer" || gameState == false)
      return;
    var randblock = Math.floor(Math.random() * 9);
    while (blockStates[randblock] != undefined) {
      randblock = Math.floor(Math.random() * 9);
    }
    return randblock;
  }

  function closeToast() {
    setToast({ type: null, message: null });
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
          <Dropdown.Item
            onClick={() => chooseGameMode({ gameMode })}
            className="text-white hover:bg-gray-500">
            Reset score
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
      <div
        id="toast-top-right"
        onClick={closeToast}
        className={`absolute flex items-center justify-between w-72 max-w-xs p-4 rounded-lg shadow top-5 right-5 text-cyan-400 divide-gray-700 space-x bg-gray-700 transition-opacity ease-in-out duration-500 ${
          toast.type == "success" ? " opacity-100" : "opacity-0"
        }`}
        role="alert">
        <div className="text-sm font-normal">{toast.message}</div>
        <svg
          aria-hidden="true"
          className="w-4 h-4 text-cyan-400"
          focusable="false"
          data-prefix="fas"
          data-icon="paper-plane"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"></path>
        </svg>
      </div>
    </div>
  );
}
