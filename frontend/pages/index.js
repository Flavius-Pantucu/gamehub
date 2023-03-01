import Head from "next/head";
import Navbar from "../components/navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    axios.get("/api/tutorials").then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <>
      <Head>
        <title>GameHub</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar></Navbar>
    </>
  );
}
