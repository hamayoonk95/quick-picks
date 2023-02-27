import React, { useState, useEffect } from "react";
import "./Analytics.css";
import { useRefreshToken, useAxiosJWT } from "../../utils/useAxiosJWT";
import { useNavigate } from "react-router-dom";
import { WatchedHours, WatchedGenres, FavActors } from "../../components";

const Analytics = () => {
  const [token, setToken,expire, setExpire,refreshToken] = useRefreshToken();

  // create an axios instance with JWT auth
  const axiosJWT = useAxiosJWT(token, setToken,expire, setExpire);
  // declare state variables for user and its movies
  const [user, setUser] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  // use the "useNavigate" hook to change routes
  const navigate = useNavigate();

  
  // refreshes the accesstoken when it expires
  useEffect(() => {
    refreshToken();
  }, [token]);

  // calls getUsers() which fetches user data when the component mounts or token changes
  useEffect(() => {
    if (token !== "") {
      getUsers();
    }
  }, [token]);

  // Fetch user data and their watched movies from backend
  const getUsers = async () => {
    try {
      const response = await axiosJWT.get("analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update the state with the response data
      setUser(response.data.username.toUpperCase());
      // if response has movies data then set the movie state with response
      if (response.data.movies !== null || response.data.movies !== undefined) {
        setUserMovies(response.data.movies);
      }
    } catch (err) {
      // redirect to the login page on error
      navigate("/account");
      console.log(err);
    }
  };

  return (
    <div className="analytics">
      <h1 className="user-greet">Hello {user}</h1>
      {/* if userMovies length is not 0 then render the components and pass userMovies as props */}
      {userMovies.length !== 0 ? (
        <>
          <div className="watched-hours">
            <WatchedHours movies={userMovies} aria-label="Total watched hours"/>
          </div>
          <div className="watched-genres">
            <WatchedGenres movies={userMovies}/>
          </div>
          <div className="fav-actors">
            <FavActors movies={userMovies}/>
          </div>
        </>
      ) : (
        // if userMovies is empty, then display to user that they have not watched anything
        <div className="not-watched"> You havent watched anything yet</div>
      )}
    </div>
  );
};

export default Analytics;
