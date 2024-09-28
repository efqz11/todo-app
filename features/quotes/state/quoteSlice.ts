import { create } from 'zustand';
import { fetchRandomQuote } from '../api/quoteService';

interface QuoteState {
  quote: string;
  author: string;
  getRandomQuote: () => Promise<void>;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  quote: '',
  author: '',
  getRandomQuote: async () => {
    const data = await fetchRandomQuote();
    set({ quote: data.text, author: data.author });
  },
}));
