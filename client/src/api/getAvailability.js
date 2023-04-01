import axios from "axios"


const getAvailability = async (id) => {
    // configuration of the HTTP request with the API endpoints, headers, any query params
    const options = {
        method: 'GET',
        url: `https://streamlinewatch-streaming-guide.p.rapidapi.com/movies/${id}`,
        params: {platform: 'web', region: 'US'},
        headers: {
            'X-RapidAPI-Key': '8d5607ebbbmshfbac09b4b2ad564p14f32bjsnff83f0981c92',
            'X-RapidAPI-Host': 'streamlinewatch-streaming-guide.p.rapidapi.com'
          }
      };

      // HTTP request with axios and returning the data if successful
      return axios.request(options).then(function (response) {
        // store the response in result variable
        const result = response.data;
        // return the result
        return result;
    }).catch(function (error) {
        // log error if request fails
        console.error(error);
    });
    
}

export default getAvailability;
  
