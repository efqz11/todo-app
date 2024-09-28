const API_URL = 'https://thequoteapi.com/api/quotes/random';
import axios from 'axios';

export const fetchRandomQuote = async () => {
    try {
        const response = await axios.get(API_URL, {
          headers: {
            'Content-Type': 'application/json', // Specify the content type
            'api_key': 'live_2YMM5IPRx89SF3ZDOEEDpovnYDtk4Ucsa95R4xVz3XFOvJBzubKmFe7D30tPXODO', // Optional: if you need to send an auth token
          },
        });
        console.log('Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error sending data:', error);
      }
};
