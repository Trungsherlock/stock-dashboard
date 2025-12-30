import { useState, useRef, useEffect } from 'react';
import type { Suggestion } from '../types/stock';
import { fetchStockSuggestions } from '../services/stockApi';

interface SearchBarProps {
    onSearch: (symbol: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Priority 1: If user highlighted a suggestion, use it
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            selectSuggestion(suggestions[selectedIndex]);
        }
        // Priority 2: Use typed input
        else if (input.trim()) {
            onSearch(input.trim().toUpperCase());
            setInput("");
            setShowDropdown(false);
        }
    };

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (input.length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        setIsLoading(true);

        const timeoutId = setTimeout(async () => {
            try {
                const results = await fetchStockSuggestions(input);
                setSuggestions(results);
                setShowDropdown(results.length > 0);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [input]);

    useEffect(() => {
        if (selectedIndex >= 0 && dropdownRef.current) {
            const items = dropdownRef.current.children;
            const selectedElement = items[selectedIndex] as HTMLElement;

            if (selectedElement) {
                    selectedElement.scrollIntoView({
                    block: "nearest", 
                    behavior: "smooth", 
                });
            }
        }
    }, [selectedIndex]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showDropdown) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : -1
                );
                break;

            case "Enter":
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    selectSuggestion(suggestions[selectedIndex]);
                }
                break;
        }
    };

    const selectSuggestion = (suggestion: Suggestion) => {
        onSearch(suggestion.symbol);
        setInput("");
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    return (
        <div className="relative mb-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setSelectedIndex(-1);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (suggestions.length > 0) {
                                setShowDropdown(true);
                            }
                        }}
                        placeholder="Search stock symbol..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {showDropdown && (
                        <div
                            ref={dropdownRef}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                            {isLoading ? (
                                <div className="px-4 py-3 text-gray-500 text-sm">
                                    Loading suggestions...
                                </div>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((suggestion, index) => (
                                <div
                                    key={suggestion.symbol}
                                    className={`
                                        px-4 py-3 cursor-pointer transition-colors
                                        ${
                                        index === selectedIndex
                                            ? "bg-blue-100"
                                            : "hover:bg-gray-100"
                                        }
                                    `}
                                    onClick={() => selectSuggestion(suggestion)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="font-semibold text-gray-900">
                                        {suggestion.symbol}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {suggestion.name}
                                    </div>
                                </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-gray-500 text-sm">
                                    No stocks found
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Add Stock
                </button>
            </form>
        </div>
    );
};

export default SearchBar;