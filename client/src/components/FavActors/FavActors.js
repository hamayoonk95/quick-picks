import React from "react";
import "./FavActors.css";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip,YAxis, Legend } from "recharts";

const FavActors = ({ movies }) => {
  const actorCount = {};
  movies.forEach((movie) => {
    const actors = movie.movie.credits.split("-");
    actors.forEach((actor) => {
      if (!actorCount[actor]) {
        actorCount[actor] = 1;
      } else {
        actorCount[actor]++;
      }
    });
  });

  const actorData = Object.entries(actorCount).map(([name, value]) => ({
    name,
    value,
  }));
  const top5Actors = actorData.sort((a, b) => b.value - a.value).slice(0, 5);

  console.log(top5Actors);
  return (
    <div className="bar-container">
      <div className="bar-title">Favourite Actors</div>
      <div className="bar-actors">
        <BarChart
          width={400}
          height={400}
          data={top5Actors}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{fontSize: "0.5rem"}} />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default FavActors;
