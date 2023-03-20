import Head from "next/head";
import Navbar from "../components/navbar";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Window from "../components/window";
import { setCookie, getCookie, hasCookie } from "cookies-next";
import Modal from "../components/modal";
import Toast from "../components/toast";
import Container from "../components/container";

const elements = [
  { name: "Dashboard", current: false },
  { name: "TicTacToe", current: false },
  { name: "Sudoku", current: true },
  { name: "Chess", current: false },
];

export default function Home() {
  const [currentElement, setCurrentElement] = useState("Sudoku");
  const [userSession, setUserSession] = useState();
  const [currentModal, setCurrentModal] = useState("");
  const [toast, setToast] = useState({ type: null, message: null });
  const [theme, setTheme] = useState("dark");

  const selectedGame = (game) => {
    setCurrentElement(game);
  };

  const childSetModal = (modal) => {
    setCurrentModal(modal);
  };

  const closeToast = () => {
    setToast({ type: null, message: null });
  };

  useEffect(() => {
    toast.type != null
      ? setTimeout(() => setToast({ type: null, message: null }), 2500)
      : "";
  }, [toast]);

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
      <Container theme={theme}>
        <Navbar
          theme={theme}
          elements={elements}
          session={userSession}
          selectGame={selectedGame}
          childSetModal={childSetModal}
          childSetTheme={setTheme}></Navbar>
        <Window
          window={currentElement}
          setToast={setToast}
          theme={theme}></Window>
        <Modal
          theme={theme}
          modal={currentModal}
          childSetModal={childSetModal}></Modal>
        <Toast theme={theme} toast={toast} closeToast={closeToast}></Toast>
      </Container>
    </>
  );
}
