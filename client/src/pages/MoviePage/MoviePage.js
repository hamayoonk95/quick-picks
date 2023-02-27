import React, { useState, useEffect } from "react";
import { Movie, StreamingPlatformIcon } from "../../components";
import "./MoviePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRefreshToken, useAxiosJWT } from "../../utils/useAxiosJWT";
import getAvailability from "../../api/getAvailability";
import { FlashMsg } from "../../components";

const MoviePage = () => {
  const navigate = useNavigate();
  // Custom hook to manage JWT token
  const [token, setToken, expire, setExpire, refreshToken] = useRefreshToken();
  // Custom hook to perform axios requests with JWT token
  const axiosJWT = useAxiosJWT(token, setToken, expire, setExpire);
  // Response message for the user
  const [resMsg, setResMsg] = useState("");
  // Type of response message, can be 'error' or 'success'
  const [responseType, setResponseType] = useState("");
  // Get the movie id from URL parameter
  const { id } = useParams();
  // State to hold the movie data
  const [movie, setMovie] = useState(null);
  // State to hold the available streaming services for the movie
  const [streamingService, setStreamingService] = useState(null);
   // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // Fetch movie data from API when the id parameter changes
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`/movie/${id}`);
      const result = await response.json();
      setMovie(result);
    };
    fetchMovie();
  }, [id]);

  // Refresh JWT token when it is available in local storage
  useEffect(() => {
    console.log(localStorage.accessToken);
    if (localStorage.accessToken) {
      refreshToken();
    }
  }, [token]);

  // Fetch available streaming services for the movie
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

  // Handle watch button click
  const handleWatch = async () => {
    try {
      console.log(token);
      const response = await axiosJWT.post(
        "/watch-movie",
        {
          movie_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setResMsg("Movie added to watch history");
        setResponseType("success");
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 409) {
        setResMsg("This movie has already been added to your watch history");
        setResponseType("error");
      } else {
        navigate("/account");
      }
    }
  };

  // Go back to previous page
  const prevPage = () => {
    navigate(-1);
  };

  return (
    <div className="container">
    {/* Displays error message to the user */}
      <div className="flash-msg">
        {resMsg && <FlashMsg msg={resMsg} type={responseType} />}
      </div>
      {/* if movie is not empty, renders Movie component and passes movie as props*/}
      {movie ? (
        <div className="flex-center movie-container">
          <Movie {...movie} />
        </div>
      ) : null}

      {/* If streaming services are available for the movie, displays them */}
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

      {/* Buttons to handleWatch which adds movie to the database and associates it with the user, or go to PrevPage */}
      <div className="buttons">
        <button onClick={handleWatch}>Watch</button>
        <button onClick={prevPage}>Go Back</button>
      </div>
    </div>
  );
};

export default MoviePage;
