import React from "react";
import Header from "./components/Header";
import Evenements from "./components/Evenements";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Bienvenue sur EventHub</h1>
        <Evenements />
      </main>
    </>
  )
}

export default App
