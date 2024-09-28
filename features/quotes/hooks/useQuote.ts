import { useEffect } from 'react';
import { useQuoteStore } from '../state/quoteSlice';

export const useQuotes = () => {
  const { quote, author, getRandomQuote } = useQuoteStore();

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  return { quote, author };
};