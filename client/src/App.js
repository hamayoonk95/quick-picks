import "./App.css";
import React, {useState} from "react";
import { Navbar } from "./components";
import { Home, FilterSearch, Roulette, Account, MoviePage, Analytics } from "./pages";
import { Routes, Route } from "react-router-dom";
function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.accessToken ? true : false);
  
  function changeLoggedIn(value) {
    setLoggedIn(value);
    console.log(loggedIn);
    if(value === false) {
      localStorage.clear();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar loggedIn={loggedIn} setLoggedIn={changeLoggedIn}/>
      </header>
      <div className="body">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/filter-search" element={<FilterSearch />}></Route>
        <Route path="/roulette" element={<Roulette />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
