import React, { useState, useEffect } from "react";
import "./Analytics.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { WatchedHours, WatchedGenres, FavActors } from "../../components";

const Analytics = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
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

  const refreshToken = async () => {
    try {
      const response = await axios.get("/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
      if (error.response) {
        navigate("/account");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    try {
      const response = await axiosJWT.get("analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.username.toUpperCase());
      // console.log(response.data.movies);
      if (response.data.movies !== null || response.data.movies !== undefined) {
        setUserMovies(response.data.movies);
      }
    } catch (err) {
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
