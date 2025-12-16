import React from "react";
import Header from "./components/Header";
import { EvenementsList } from "./components/Evenements";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Bienvenue sur EventHub</h1>
        <EvenementsList />
      </main>
    </>
  )
}

export default App
