import React from 'react';
import { useLocation } from 'react-router-dom';

const Movie = () => {
    const location = useLocation();
    console.log(location);
    return (
        <>
        <div></div>
        {/* {console.log(movie)} */}
        </>
    //     <div className="card">
    //     <div className="poster-container">
    //       <img src={backdrop_path} alt={title} className="poster" />
    //     </div>
    //     <div className="info-container">
    //       <div className="info">
    //         <h2 className="title">
    //           {title} ({release_date.substring(0, 4)})
    //         </h2>
    //         <div className="rating">{vote_average.toFixed(1)}</div>
    //         <p className="description">
    //           {overview}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    )
}

export default Movie;