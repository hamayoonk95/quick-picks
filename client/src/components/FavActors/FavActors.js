import React from "react";
import "./FavActors.css";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";

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

  return (
    <div className="bar-container">
      <div className="bar-title">Favourite Actors</div>
      <div className="bargraph-actors">
        <ResponsiveContainer width={400} height={400}>
          <BarChart
            data={top5Actors}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontSize: "0.55rem" }} />
            {/* <YAxis /> */}
            <Tooltip />
            <Bar className="bar" dataKey="value"  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FavActors;
