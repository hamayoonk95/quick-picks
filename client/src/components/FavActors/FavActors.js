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
  // An object to store actor names and their frequency
  const actorCount = {};
  // Loop through all the movies
  movies.forEach((movie) => {
    // split the credits by '-' to get individual actors
    if (movie.movie.credits.trim() !== "") {
      const actors = movie.movie.credits.split("-");
      // loop through all actors and count their occurrences
      actors.forEach((actor) => {
        if (!actorCount[actor]) {
          actorCount[actor] = 1;
        } else {
          actorCount[actor]++;
        }
      });
    }
  });

  // Convert actorCount object to an array of objects to use with BarChart
  const actorData = Object.entries(actorCount).map(([name, value]) => ({
    name,
    value,
  }));
  // sort the actorData array by value and return top 5 actors
  const top5Actors = actorData.sort((a, b) => b.value - a.value).slice(0, 5);
  return (
    // Bar chart container
    <div className="bar-container">
      <div className="bar-title">Favourite Actors</div>
      <div className="bargraph-actors">
        {/* Responsive container for BarChart */}
        <ResponsiveContainer width={400} height={400}>
          {/* BarChart component */}
          <BarChart
            data={top5Actors}
            role="img"
            aria-label="Favorite Actors Bar Chart"
            tabIndex="0"
          >
            {/* CartesianGrid component */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* XAxis component */}
            <XAxis dataKey="name" style={{ fontSize: "0.55rem" }} />
            {/* <YAxis /> */}
            <Tooltip />
            <Bar className="bar" dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FavActors;
