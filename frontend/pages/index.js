import Head from "next/head";
import Navbar from "../components/navbar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Window from "../components/window";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import AuthModal from "../components/auth_modal";

const elements = [
  { name: "Dashboard", current: true },
  { name: "TicTacToe", current: false },
  { name: "Sudoku", current: false },
  { name: "Poker", current: false },
];

export default function Home() {
  const [currentElement, setCurrentElement] = useState("Dashboard");
  const [userSession, setUserSession] = useState();
  const [showModal, setShowModal] = useState(true);

  const selectedGame = (game) => {
    setCurrentElement(game);
  };

  const setLogin = (state) => {
    setShowModal(state);
  };

  useEffect(() => {
    hasCookie("user_session") ? setUserSession(true) : setUserSession(false);

    // axios.get("/api/tutorials").then((response) => {
    //   console.log(response);
    // });
  }, []);

  return (
    <>
      <Head>
        <title>GameHub</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar
        elements={elements}
        session={userSession}
        selectGame={selectedGame}
        setLogin={setLogin}></Navbar>
      <Window window={currentElement}></Window>
      {showModal == true ? <AuthModal setLogin={setLogin}></AuthModal> : <></>}
    </>
  );
}
