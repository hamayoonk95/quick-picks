import React from "react";
import "./WatchedHours.css";
import CountUp from "react-countup";

const WatchedHours = ({ movies }) => {
  const hours = movies.map((movie) => {
    return movie.movie.runtime;
  });
  let totalHours = hours.reduce((sum, a) => sum + a, 0);
  totalHours = Math.round(totalHours / 60);
  return (
    <>
      <CountUp
        className="count"
        prefix={"Total Hours Spent Watching: "}
        end={totalHours}
        duration={1}
      />
    </>
  );
};

export default WatchedHours;
