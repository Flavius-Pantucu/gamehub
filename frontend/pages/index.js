import Head from "next/head";
import Navbar from "../components/navbar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Window from "../components/window";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import AuthModal from "../components/auth_modal";
import RegisterModal from "../components/register_modal";

const elements = [
  { name: "Dashboard", current: true },
  { name: "TicTacToe", current: false },
  { name: "Sudoku", current: false },
  { name: "Poker", current: false },
];

export default function Home() {
  const [currentElement, setCurrentElement] = useState("Dashboard");
  const [userSession, setUserSession] = useState();
  const [modal, setModal] = useState("none");

  const selectedGame = (game) => {
    setCurrentElement(game);
  };

  const childSetModal = (modal) => {
    setModal(modal);
  };

  useEffect(() => {
    //verify cookie validity
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
        childSetModal={childSetModal}></Navbar>
      <Window window={currentElement}></Window>
      {modal == "login" ? (
        <AuthModal childSetModal={childSetModal}></AuthModal>
      ) : (
        <></>
      )}
      {modal == "register" ? (
        <RegisterModal childSetModal={childSetModal}></RegisterModal>
      ) : (
        <></>
      )}
    </>
  );
}
