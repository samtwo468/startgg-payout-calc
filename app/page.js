require('dotenv').config()
import React from "react";
import Header from './components/Header'
import TournamentEntry from "./components/TournamentEntry"

export default function Home() {
  return (
    <div>
      <Header></Header>
      <TournamentEntry></TournamentEntry>
    </div>
  );
}
