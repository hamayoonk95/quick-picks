import React from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../../components';
import './MoviePage.css'

const MoviePage = () => {
    const location = useLocation();
    return (
        <div className='container'>
        <div className='flex-center movie-container'>
        <Movie {...location.state}/>
        </div>
        <div className='buttons'>
        <button>Watch</button>
        <button>Search Again</button>
        </div>
        </div>
    )
}

export default MoviePage;