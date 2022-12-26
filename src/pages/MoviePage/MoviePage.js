import React from 'react';
import { useLocation } from 'react-router-dom';

const MoviePage = () => {
    const location = useLocation();
    console.log(location);
    return (
        <div></div>
    )
}

export default MoviePage;