import type { Stock } from '../types/stock';
import { useState } from 'react';

interface StockTableProps {
    stocks: Stock[];
}

type SortField = 'symbol' | 'price' | 'change' | 'previousClose' | 'open' | 'high' | 'low';
type SortDirection = 'asc' | 'desc';

interface SortArrowProps {
    field: SortField;
    sortField: SortField;
    sortDirection: SortDirection;
}

const SortArrow = ({ field, sortField, sortDirection }: SortArrowProps) => {
    if (sortField === field) return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
};

const StockTable = ({ stocks }: StockTableProps) => {
    const [sortField, setSortField] = useState<SortField>('symbol');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedStocks = [...stocks].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortDirection === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const formatPercentage = (change: number | undefined): string => {
        if (change === undefined || change === null || isNaN(change)) {
            return 'N/A';
        }
        const sign = change >= 0 ? '+' : '';
        return `${sign}${change.toFixed(4)}%`;
    };

    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-linear-to-r from-blue-600 to-blue-700">
            <tr>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("symbol")}
              >
                Symbols{" "}
                <SortArrow
                  field="symbol"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("price")}
              >
                Price{" "}
                <SortArrow
                  field="price"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("change")}
              >
                Change (%){" "}
                <SortArrow
                  field="change"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("previousClose")}
              >
                Prev Close{" "}
                <SortArrow
                  field="previousClose"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("open")}
              >
                Open{" "}
                <SortArrow
                  field="open"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("high")}
              >
                High{" "}
                <SortArrow
                  field="high"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracker-wider cursor-pointer hover:bg-blue-800 transition-colors"
                onClick={() => handleSort("low")}
              >
                Low{" "}
                <SortArrow
                  field="low"
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stocks.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No stock data available.
                </td>
              </tr>
            ) : (
              sortedStocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {stock.symbol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(stock.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        stock.change >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {formatPercentage(stock.change)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(stock.previousClose)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(stock.open)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-green-700">
                      {formatPrice(stock.high)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-red-700">
                      {formatPrice(stock.low)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
};

export default StockTable;