import express from "express";
import axios from "axios";
const router = express.Router();

import { CRYPTO_SYMBOLS_URL, CRYPTO_DATA_URL } from "../constants.js";

router.get("/symbols", (req, res) => {
  axios
    .get(CRYPTO_SYMBOLS_URL, {
      headers: { "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY },
      params: { limit: 100 },
    })
    .then((result) => {
      const data = result.data.data;
      let symbols = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        symbols.push({ symbol: item.symbol, name: item.name });
      }
      res.json(symbols);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/", (req, res) => {
  axios
    .get(CRYPTO_DATA_URL)
    .then((result) => {
      const data = result.data.Data.Data;
      let cryptoArray = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        var crypto = {
          time: new Date(Math.round(item.time / 3600 / 24) * 86400 * 1000)
            .toString()
            .substring(0, 24),
          high: item.high,
          low: item.low,
        };
        cryptoArray.push(crypto);
      }
      res.json(cryptoArray);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

export { router as cryptoRoutes };
