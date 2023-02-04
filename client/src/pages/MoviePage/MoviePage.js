import React, { useState, useEffect } from "react";
import { Movie, StreamingPlatformIcon } from "../../components";
import "./MoviePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRefreshToken, useAxiosJWT } from "../../utils/useAxiosJWT";
import getAvailability from "../../api/getAvailability";
import { FlashMsg } from "../../components";

const MoviePage = () => {
  const navigate = useNavigate();
  const [token, setToken, expire, setExpire, refreshToken] = useRefreshToken();
  const axiosJWT = useAxiosJWT(token, setToken, expire, setExpire);
  const [resMsg, setResMsg] = useState("");
  const [responseType, setResponseType] = useState("");
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

  useEffect(() => {
    if(localStorage.accessToken)
      refreshToken();
  }, [token]);


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

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="flash-msg">
      {resMsg && <FlashMsg msg={resMsg} type={responseType} />}
      </div>
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
        <button onClick={handleWatch}>Watch</button>
        <button onClick={prevPage}>Go Back</button>
      </div>
    </div>
  );
};

export default MoviePage;
