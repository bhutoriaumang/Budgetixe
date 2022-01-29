const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
const API_KEY = "5ESBFJPMQ7O56KWH";
let StockSymbol = "MSFT";
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&&apikey=${API_KEY}`;
console.log("HI");
app.get("/stock", (req, res) => {
    axios
    .get(url)
    .then((result) => {
        const data = result.data;
        let list = [];
        for (var key in data["Time Series (Daily)"]) {
            list.push({
                name: key,
                value: parseFloat(data["Time Series (Daily)"][key]["4. close"]),
            });
        }
        let pdata = {
            "name": StockSymbol,
            "value": list.reverse()
        }
        res.json(pdata);
    })
    .catch((err) => {
        console.log(err.message);
    });
    console.log("HI");
});
