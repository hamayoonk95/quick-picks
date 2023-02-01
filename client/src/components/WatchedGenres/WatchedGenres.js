import React from "react";
import "./WatchedGenres.css";
import { PieChart, Pie, Tooltip } from "recharts";

const WatchedGenres = ({ movies }) => {
  const genreCount = {};
  movies.forEach((movie) => {
    const genres = movie.movie.genres.split("-");
    genres.forEach((genre) => {
      if (!genreCount[genre]) {
        genreCount[genre] = 1;
      } else {
        genreCount[genre]++;
      }
    });
  });
  const genreData = Object.entries(genreCount).map(([name, value]) => ({ name, value }));
  
  const top5Genres = genreData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
    
    
  return (
    <div className="pie-container">
      <div className="pie-title">Most watched Genres</div>
      <div className="pie-genre">
        <PieChart width={500} height={300}>
        <Pie
        data={top5Genres}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#f9ab53"
        dataKey="value"
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
              x={x}
              y={y}
              style={{fontSize: "0.5rem"}}
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
      </div>
    </div>
  );
};

export default WatchedGenres;
