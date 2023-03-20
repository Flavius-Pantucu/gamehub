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
  const [theme, setTheme] = useState();

  const selectedGame = (game) => {
    setCurrentElement(game);
  };

  const childSetModal = (modal) => {
    setCurrentModal(modal);
  };

  const closeToast = () => {
    setToast({ type: null, message: null });
  };

  const changeTheme = (theme) => {
    setTheme(theme);
    setCookie("site_theme", theme);
  };

  useEffect(() => {
    toast.type != null
      ? setTimeout(() => setToast({ type: null, message: null }), 2500)
      : "";
  }, [toast]);

  useEffect(() => {
    //verify cookie validity
    if (hasCookie("site_theme")) setTheme(getCookie("site_theme"));
    else {
      setTheme("dark");
      setCookie("site_theme", "dark");
    }

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
          childSetTheme={changeTheme}></Navbar>
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
