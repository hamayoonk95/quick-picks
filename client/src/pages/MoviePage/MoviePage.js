import React, { useState, useEffect } from "react";
import { Movie, StreamingPlatformIcon } from "../../components";
import "./MoviePage.css";
import { useNavigate, useParams } from "react-router-dom";
import getAvailability from "../../api/getAvailability";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [streamingService, setStreamingService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/movie/${id}`);
      const result = await response.json();
      setMovie(result);
    };
    fetchMovie();
  }, [id]);

 // useEffect(() => {
  //   console.log(movie);
  //   const fetchData = async () => {
  //     if (movie) {
  //       const data = await getAvailability(movie.tmdb_id);
  //       if (data.length > 0) {
  //         setStreamingService(data[0].sources);
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   if (isLoading) {
  //     fetchData();
  //   }
  // }, [movie, isLoading]);

  const navigate = useNavigate();
  const prevPage = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      {movie ? (
        <div className="flex-center movie-container">
          <Movie {...movie} />
        </div>
      ) : null}

      <div className="streaming-icons">
        {/* {streamingService &&
          streamingService.map((service) => (
            <StreamingPlatformIcon
              key={service.source}
              src={service.source}
              link={service.link}
            />
          ))} */}
          <StreamingPlatformIcon key={"abc"} src={"netflix"} link={"//"} />
          <StreamingPlatformIcon key={"aa"} src={"disney_plus"} link={"//"} />
          <StreamingPlatformIcon key={"aab"} src={"vudu"} link={"//"} />
      </div>
      <div className="buttons">
        <button>Watch</button>
        <button onClick={prevPage}>Go Back</button>
      </div>
    </div>
  );
};

export default MoviePage;
