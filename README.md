# Stock Price Dashboard

A real-time stock price dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive stock market data with an intuitive user interface and powerful features for tracking your favorite stocks.

## Features

### Core Features
- **Real-time Stock Data Display** - Live stock quotes from Finnhub API
- **Responsive Table Layout** - Mobile-first design that works on all screen sizes
- **Essential Stock Information** - Symbol, price, and percentage change displayed clearly

### Enhanced Features

#### Comprehensive Market Data
- **7 Data Columns**: Symbol, Price, Change %, Previous Close, Open, High, Low
- **Color-Coded Indicators**:
  - Green badges for positive changes
  - Red badges for negative changes
  - Green text for daily highs
  - Red text for daily lows
- **Currency Formatting**: Professional USD formatting for all prices
- **Precision Percentage Display**: 4 decimal places for accurate tracking

#### Advanced Search
- **Intelligent Autocomplete** - Real-time search powered by Finnhub API
- **Smart Suggestions Dropdown** - Displays up to 10 relevant stock matches with company names
- **Advanced Keyboard Navigation**:
  - Arrow Down - Navigate to next suggestion
  - Arrow Up - Navigate to previous suggestion
  - Enter - Select highlighted suggestion (or submit typed input if none selected)
- **Debounced Search** - 300ms delay prevents excessive API calls while typing
- **Smart Dropdown Behavior**:
  - Only shows after typing 2+ characters
  - Auto-hides when input cleared
  - Re-opens on focus if suggestions exist
  - Closes after selection with auto-focus return to input
- **Scroll Intelligence** - Auto-scrolls to keep highlighted suggestion visible
- **Common Stocks Filter** - Only displays publicly traded common stocks
- **Visual Loading States** - "Loading suggestions..." indicator during API calls
- **Empty State Handling** - "No stocks found" message when no results
- **Focus Management** - Returns focus to input after selection for seamless UX
- **Auto-reset Selection** - Selection index resets to -1 when typing
- **React Refs Usage** - Uses useRef for DOM manipulation (dropdownRef, inputRef)

#### Data Management
- **One-Click Refresh** - Manual data refresh button
- **Auto-refresh on Symbol Change** - Automatic updates when watchlist changes
- **Duplicate Prevention** - Smart validation prevents adding the same stock twice
- **Invalid Symbol Detection** - Validates stock symbols before adding
- **Parallel API Calls** - Efficient Promise.allSettled for batch loading
- **Graceful Error Handling** - Failed stock fetches don't break the entire app

#### Interactive Table Features
- **7-Column Sorting** - Click any header to sort:
  - Symbol (alphabetical)
  - Current Price
  - Change %
  - Previous Close
  - Open Price
  - High Price
  - Low Price
- **Visual Sort Indicators** - Up/down arrows show current sort direction
- **Bi-directional Sorting** - Toggle between ascending and descending
- **Hover Effects** - Row highlighting on mouse hover

#### User Experience Enhancements
- **Loading Spinner** - Animated loading indicator during data fetch
- **Error Messages** - Clear, user-friendly error display
- **Auto-dismiss Notifications** - Errors automatically clear after 3 seconds
- **Empty State Handling** - Helpful message when no stocks are displayed
- **Focus Management** - Smart focus return after selecting suggestions
- **Responsive Design** - Horizontal scrolling on mobile, full table on desktop

## Tech Stack

### Frontend Framework
- **React 19.2.0**
- **TypeScript 5.9.3** 
- **Vite 7.2.4**

### Styling
- **Tailwind CSS 4.1.18**
- **@tailwindcss/postcss 4.1.18**
- **PostCSS 8.5.6**
- **Autoprefixer 10.4.23**

### Data & API
- **Finnhub API**
- **Native Fetch API**
- **Promise.allSettled**

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Finnhub API key (free tier available)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd stock-dashboard
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:

```env
VITE_FINNHUB_API_KEY=your_api_key_here
```

**Get your free API key:**
1. Visit [Finnhub.io](https://finnhub.io/)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Paste it in the `.env` file

### Step 4: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
```

### Step 6: Preview Production Build
```bash
npm run preview
```

## Component Breakdown

### App.tsx
- Main application container
- State management for stocks, loading, and errors
- Handles stock addition and refresh logic
- Renders header, search bar, and table components

### SearchBar.tsx
- Autocomplete search input
- Debounced API calls (300ms delay)
- Keyboard navigation (arrow keys, enter)
- Click and hover selection support
- Loading and empty states

### StockTable.tsx
- 7-column sortable table
- Visual sort indicators (arrows)
- Responsive horizontal scrolling
- Color-coded price changes
- Professional formatting for prices and percentages

### stockApi.ts
- `fetchStockQuote()` - Fetches single stock data
- `fetchMultipleStocks()` - Batch fetches multiple stocks
- `fetchStockSuggestions()` - Searches for stock symbols
- Error handling and validation
- Invalid symbol detection

## Features Walkthrough

### Adding a Stock
1. Type at least 2 characters in the search box
2. Wait for autocomplete suggestions (300ms debounce)
3. Use arrow keys or mouse to select a suggestion
4. Press Enter or click "Add Stock" button
5. Stock is added to the watchlist and data is fetched

### Sorting the Table
1. Click any column header to sort by that field
2. Click again to reverse the sort direction
3. Visual arrows indicate current sort column and direction
4. Supports all 7 columns

### Refreshing Data
1. Click the "Refresh Data" button in the header
2. Loading spinner appears while fetching
3. All stocks are re-fetched with latest data
4. Button is disabled during loading

## Error Handling

- **Invalid Symbols**: Detects and prevents adding non-existent stocks
- **Duplicate Stocks**: Prevents adding the same symbol twice
- **API Failures**: Graceful handling with user-friendly error messages
- **Network Issues**: Timeout and retry logic built into fetch calls
- **Auto-dismissal**: Error messages automatically disappear after 3 seconds

## Performance Optimizations

- **Debounced Search**: Reduces API calls during typing
- **Parallel Fetching**: Multiple stocks loaded simultaneously
- **Promise.allSettled**: Failed fetches don't block successful ones
- **Efficient Re-renders**: React.memo and proper key usage
- **Optimized Sorting**: Client-side sorting without API calls
- **Lazy Loading**: Components loaded on demand

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard
VITE_FINNHUB_API_KEY=your_api_key
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FINNHUB_API_KEY` | Finnhub API key for stock data | Yes |

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **Finnhub** - For providing free stock market data API
- **Tailwind CSS** - For the amazing utility-first CSS framework
- **React Team** - For the incredible React library
- **Vite Team** - For the blazing-fast build tool
