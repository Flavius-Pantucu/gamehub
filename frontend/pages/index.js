import Head from "next/head";
import Navbar from "../components/navbar";

export default function Home() {
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
