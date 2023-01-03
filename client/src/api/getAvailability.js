import axios from "axios"


const getAvailability = async (id) => {
    const options = {
        method: 'GET',
        url: `https://streamlinewatch-streaming-guide.p.rapidapi.com/movies/${id}`,
        params: {platform: 'web', region: 'US'},
        headers: {
            'X-RapidAPI-Key': '217f43bc49mshc9b3ba070763864p11f418jsn32c480dab6bf',
            'X-RapidAPI-Host': 'streamlinewatch-streaming-guide.p.rapidapi.com'
          }
      };
      return axios.request(options).then(function (response) {
        const result = response.data;
        return result;
    }).catch(function (error) {
        console.error(error);
    });
    
}

export default getAvailability;
  
