const API_URL = 'http://api.quotable.io/random';

export const fetchRandomQuote = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
};
