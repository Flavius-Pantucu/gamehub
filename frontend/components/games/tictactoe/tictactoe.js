import Square from "./square";
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "flowbite-react";

export default function TicTacToe(props) {
  var computerMove = useRef(false);
  var move = useRef("x");
  var turn = useRef(0);
  const [blockStates, setBlockStates] = useState(new Array(9));
  const [score, setScore] = useState({ x: 0, tie: 0, y: 0 });
  const [gameMode, setGameMode] = useState("computer");
  const [gameState, setGameState] = useState(true);

  const theme = props.theme;

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

    props.setToast({
      type: "success",
      message: "Tap the board to start a new game",
    });

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

  return (
    <div className="mx-auto h-5/6 w-4/5 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1
        className={`text-2xl transition-all ease-in duration-200 ${
          theme == "dark" ? "text-white" : "text-neutral-900"
        }`}>
        <Dropdown
          label="TicTacToe"
          inline="true"
          className={`${
            theme == "dark" ? "bg-slate-900" : "bg-zinc-300"
          } border-0 ml-4 mb-0 transition-all ease-in-out duration-500`}>
          <Dropdown.Item
            onClick={() => chooseGameMode("singleplayer")}
            className={` transition-colors ease-in-out duration-300 ${
              theme == "dark"
                ? "text-white hover:bg-slate-500"
                : "text-neutral-600 hover:text-neutral-900 hover:hover:bg-zinc-400"
            }`}>
            Single-player (2P)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => chooseGameMode("computer")}
            className={` transition-colors ease-in-out duration-300 ${
              theme == "dark"
                ? "text-white hover:bg-slate-500"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-zinc-400"
            }`}>
            Single-player (1P)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => chooseGameMode("multiplayer")}
            className={` transition-colors ease-in-out duration-300 ${
              theme == "dark"
                ? "text-white hover:bg-slate-500"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-zinc-400"
            }`}>
            Multiplayer (online)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => chooseGameMode({ gameMode })}
            className={` transition-colors ease-in-out duration-300 ${
              theme == "dark"
                ? "text-white hover:bg-slate-500"
                : "text-neutral-600 hover:text-neutral-900 hover:hover:bg-zinc-400"
            }`}>
            Reset score
          </Dropdown.Item>
        </Dropdown>
      </h1>
      <div
        className={`flex h-5/6 justify-center mt-4" ${
          gameState == false
            ? theme == "dark"
              ? "opacity-40"
              : "opacity-70"
            : ""
        } `}>
        <div className="grid grid-cols-3 xl:h-96 md:h-72 sm:h-48 self-center">
          <div
            onClick={() => chooseBlock(0)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-r-2 border-b-2 cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[0]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(1)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-r-2 border-l-2 border-b-2 cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[1]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(2)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-l-2 border-b-2 cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[2]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(3)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-t-2 border-r-2 border-b-2 cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[3]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(4)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-2 cursor-pointer">
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[4]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(5)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-l-2 border-t-2 border-b-2 cursor-pointer 
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[5]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(6)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-t-2 border-r-2 cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[6]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(7)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-t-2 border-l-2 border-r-2 cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[7]} theme={theme}></Square>
          </div>
          <div
            onClick={() => chooseBlock(8)}
            className={`flex transition-all ease-in duration-200 xl:h-32 md:h-24 sm:h-16 xl:w-32 md:w-24 sm:w-16 w-8 h-8 items-center justify-center border-l-2 border-t-2 cursor-pointer"
            ${theme == "dark" ? "border-slate-300" : "border-neutral-700"}`}>
            <Square state={blockStates[8]} theme={theme}></Square>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center mt-4 transition-all ease-in duration-200 ${
          theme == "dark" ? "text-white" : "text-neutral-900"
        }`}>
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
