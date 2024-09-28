const API_URL = 'https://thequoteapi.com/api/quotes/random/';

export const fetchRandomQuote = async () => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_key': 'live_2YMM5IPRx89SF3ZDOEEDpovnYDtk4Ucsa95R4xVz3XFOvJBzubKmFe7D30tPXODO'
        }
      });
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
};
