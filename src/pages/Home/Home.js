import React from "react";
import "./Home.css";
import { RandomMovie } from "../../components";

const Home = () => {
  return (
    <>
      <div className="container">
        <RandomMovie className="random-movie" />
      </div>
    </>
  );
};

export default Home;
