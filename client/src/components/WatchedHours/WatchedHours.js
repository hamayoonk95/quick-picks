import React from "react";
import "./WatchedHours.css";
import CountUp from "react-countup";

const WatchedHours = ({ movies }) => {
  // Loop through all the movies and returns their runtimes in hours array
  const hours = movies.map((movie) => {
    return movie.movie.runtime;
  });

  // add all the hours in hours array
  let totalHours = hours.reduce((sum, a) => sum + a, 0);
  // convert minutes to hours
  totalHours = Math.round(totalHours / 60);

  return (
    <>
      {/* Display the total number of hours watched using the CountUp library, which animates the number  */}
      <CountUp
        className="count"
        prefix={"Total Hours Spent Watching: "}
        end={totalHours}
        duration={1}
        aria-label={`Total Hours Spent Watching: ${totalHours}`}
      />
    </>
  );
};

export default WatchedHours;
