// src/App.tsx
import { useEffect, useState } from "react";
import StockTable from "./components/StockTable";
import type { Stock } from "./types/stock";
import { fetchMultipleStocks, fetchStockQuote } from "./services/stockApi";
import SearchBar from "./components/SearchBar";

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Popular stocks to track
  const [stockSymbols, setStockSymbols] = useState<string[]>([
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "TSLA",
    "META",
    "NVDA",
  ]);

  const handleAddStock = async (symbol: string) => {
    if (stockSymbols.includes(symbol)) {
      setError(`${symbol} is already in your watchlist`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    setStockSymbols([...stockSymbols, symbol]);
    try {
      const newStock = await fetchStockQuote(symbol);
      setStocks([...stocks, newStock]);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch stock data.";
      setError(errorMessage);
      setStockSymbols(stockSymbols.filter(s => s !== symbol));
      setTimeout(() => setError(null), 3000);
      console.error(err);
    }
  };

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMultipleStocks(stockSymbols);
        setStocks(data);
      } catch (err) {
        setError("Failed to load stock data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, [stockSymbols]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Stock Price Dashboard
          </h1>
          <p className="text-gray-600">Real-time stock market data</p>

          <button
            onClick={() => {
              setStocks([]);
              setLoading(true);
              const loadStocks = async () => {
                try {
                  setError(null);
                  const data = await fetchMultipleStocks(stockSymbols);
                  setStocks(data);
                } catch (err) {
                  setError("Failed to load stock data. Please try again later.");
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              };
              loadStocks();
            }}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </header>

        {!loading && <SearchBar onSearch={handleAddStock} />}

        {/* Main Content */}
        <main>
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading stock data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && <StockTable stocks={stocks} />}
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          Data provided by Finnhub API
        </footer>
      </div>
    </div>
  );
}

export default App;
