import React, { useEffect } from 'react';
import { useQuoteStore } from '../state/quoteSlice';

const QuoteDisplay: React.FC = () => {
  const { quote, author, getRandomQuote } = useQuoteStore();

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <p className="text-xl italic">"{quote}"</p>
      <p className="mt-2 text-right text-gray-600">- {author}</p>
    </div>
  );
};

export default QuoteDisplay;