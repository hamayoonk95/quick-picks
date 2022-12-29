import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Movie, StreamingPlatformIcon } from '../../components';
import './MoviePage.css'
import getAvailability from '../../api/getAvailability';


const MoviePage = () => {
    const location = useLocation();
    const [streamingService, setStreamingService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAvailability(location.state.id);
      setStreamingService(data[0].sources);
      setIsLoading(false);
    };
    if (isLoading) {
      fetchData();
    }
  }, [location.state.id, isLoading]);
  console.log(streamingService);
    return (
        <div className='container'>
        <div className='flex-center movie-container'>
        <Movie {...location.state}/>
        </div>
        
        <div>
        {streamingService && streamingService.map((service) => (
        <StreamingPlatformIcon key={service.source} src={service.source} link={service.link} />
      ))}
        </div>
        <div className='buttons'>  
        <button>Watch</button>
        <button>Search Again</button>
        </div>
        </div>
    )
}

export default MoviePage;