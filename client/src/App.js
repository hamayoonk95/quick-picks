import "./App.css";
import React from "react";
import { Navbar } from "./components";
import { Home, FilterSearch, Roulette, Account, MoviePage } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/filter-search" element={<FilterSearch />}></Route>
        <Route path="/roulette" element={<Roulette />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
