import type { Stock, FinnhubQuote, Suggestion } from '../types/stock';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

interface FinnhubSearchResult {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

interface FinnhubSearchResponse {
    count: number;
    result: FinnhubSearchResult[];
}

export const fetchStockQuote = async (symbol: string): Promise<Stock> => {
    try {
        const response = await fetch(
            `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch stock data for ${symbol}`);
        }

        const data: FinnhubQuote = await response.json();

        if (data.c === 0 && data.pc === 0 && data.o === 0 && data.h === 0 && data.l === 0) {
            throw new Error(`Stock symbol "${symbol}" not found or invalid`);
        }

        return {
            symbol,
            price: data.c,
            change: data.dp,
            previousClose: data.pc,
            open: data.o,
            high: data.h,
            low: data.l,
        };
    } catch (error) {
        console.error(`Error fetch ${symbol}:`, error);
        throw error;
    }
};

export const fetchMultipleStocks = async (
    symbols: string[]
): Promise<Stock[]> => {
    try {
        const promises = symbols.map((symbol) => fetchStockQuote(symbol));
        const results = await Promise.allSettled(promises);

        return results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => (result as PromiseFulfilledResult<Stock>).value);
    } catch (error) {
        console.error('Error fetching multiple stocks:', error);
        throw error;
    }
};

export const fetchStockSuggestions = async (query: string): Promise<Suggestion[]> => {
    try {
        const response = await fetch(
            `${BASE_URL}/search?q=${encodeURIComponent(query)}&token=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch stock suggestions');
        }

        const data: FinnhubSearchResponse = await response.json();

        if (data.result && Array.isArray(data.result)) {
            return data.result
                .filter((item: FinnhubSearchResult) => item.type === 'Common Stock')
                .slice(0, 10)
                .map((item: FinnhubSearchResult) => ({
                    symbol: item.symbol,
                    name: item.description,
                }));
        }

        return [];
    } catch (error) {
        console.error('Error fetching stock suggestions:', error);
        return [];
    }
};