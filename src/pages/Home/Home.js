import React from "react";
import "./Home.css";
import { RandomMovie } from "../../components";

const Home = () => {
  return (
    <div className="container">
      <RandomMovie className="random-movie" posterUrl={`http://cdn.shopify.com/s/files/1/0037/8008/3782/products/Avengers3.jpg?v=1644083416`}
      title="Avengers"
      rating="9"
      description="Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity." />
      </div>
  );
};

export default Home;
