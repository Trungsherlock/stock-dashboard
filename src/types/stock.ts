export interface Stock {
    symbol: string;
    price: number;
    change: number;
    previousClose: number;
    open: number;
    high: number;
    low: number;
    name?: string;
}

export interface FinnhubQuote {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}