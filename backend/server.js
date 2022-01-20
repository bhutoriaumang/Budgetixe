const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10&api_key=${process.env.API_KEY}`;
app.get("/crypto", (req, res) => {
  axios
    .get(url)
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
