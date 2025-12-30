import { useState } from 'react';

interface SearchBarProps {
    onSearch: (symbol: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim().toUpperCase());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add stock symbol"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                Add Stock
            </button>
        </form>
    );
};

export default SearchBar;