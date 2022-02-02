export const CRYPTO_SYMBOLS_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map";
export const CRYPTO_DATA_URL = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=${process.env.API_KEY}`;
export const STOCKS_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${process.env.STOCKS_API_KEY}`;
