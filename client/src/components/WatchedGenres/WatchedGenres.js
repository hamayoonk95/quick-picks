import React, {useState, useEffect} from "react";
import "./WatchedGenres.css";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const WatchedGenres = ({ movies }) => {
  // an object to store genre count
  const genreCount = {};
  // loop through all movies
  movies.forEach((movie) => {
    // split the genres by '-' to get individual genres
    const genres = movie.movie.genres.split("-");
    // loop through all the genres and count their occurrences
    genres.forEach((genre) => {
      if (!genreCount[genre]) {
        genreCount[genre] = 1;
      } else {
        genreCount[genre]++;
      }
    });
  });

  // Convert genreCount object to an array to use in pieChart
  const genreData = Object.entries(genreCount).map(([name, value]) => ({ name, value }));
  
  // sort the genreData array by value and return top 5 genres
  const top5Genres = genreData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
    
    
  return (
    // Pie chart container
    <div className="pie-container">
      <div className="pie-title">Most watched Genres</div>
      <div className="pie-genre">
      {/* Responsive container for PieChart */}
      <ResponsiveContainer height={400}>
      {/* Piechart component */}
        <PieChart >
        <Pie
        // provides 5 genre data to the piechart
        data={top5Genres}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#f9ab53"
        dataKey="value"
        // add label to each pie in the PieChart 
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              className="pie-text"
              x={x}
              y={y}
              fill="#0e3a76"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {top5Genres[index].name} ({value})
            </text>
          );
        }}
      />
      
          <Tooltip />
        </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WatchedGenres;
