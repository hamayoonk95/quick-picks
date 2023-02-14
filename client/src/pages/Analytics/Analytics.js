import React, { useState, useEffect } from "react";
import "./Analytics.css";
import { useRefreshToken, useAxiosJWT } from "../../utils/useAxiosJWT";
import { useNavigate } from "react-router-dom";
import { WatchedHours, WatchedGenres, FavActors } from "../../components";

const Analytics = () => {
  const [token, setToken,expire, setExpire,refreshToken] = useRefreshToken();
  const axiosJWT = useAxiosJWT(token, setToken,expire, setExpire);
  const [user, setUser] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      getUsers();
    }
  }, [token]);

  const getUsers = async () => {
    try {
      const response = await axiosJWT.get("analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.username.toUpperCase());
      if (response.data.movies !== null || response.data.movies !== undefined) {
        setUserMovies(response.data.movies);
      }
    } catch (err) {
      navigate("/account");
      console.log(err);
    }
  };

  return (
    <div className="analytics">
      <h1 className="user-greet">Hello {user}</h1>
      {userMovies.length !== 0 ? (
        <>
          <div className="watched-hours">
            <WatchedHours movies={userMovies} />
          </div>
          <div className="watched-genres">
            <WatchedGenres movies={userMovies}/>
          </div>
          <div className="fav-actors">
            <FavActors movies={userMovies}/>
          </div>
        </>
      ) : (
        <div className="not-watched"> You havent watched anything yet</div>
      )}
    </div>
  );
};

export default Analytics;
