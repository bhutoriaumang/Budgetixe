import express from "express";
import axios from "axios";
const router = express.Router();

import { STOCKS_URL } from "../constants.js";

var stocksOwned = [
  { name: "MSFT", stocks: 500 },
  { name: "IBM", stocks: 100 },
];

router.get("/", (req, res) => {
  var getList = [];
  stocksOwned.forEach((item) =>
    getList.push(axios.get(`${STOCKS_URL}&symbol=${item.name}`))
  );
  axios
    .all(getList)
    .then(
      axios.spread((...result) => {
        let list = [];
        for (var i in result) {
          const data = result[i].data["Time Series (Daily)"];
          let sublist = [];
          for (var key in data) {
            sublist.push({
              name: key,
              value: parseFloat(data[key]["4. close"]),
            });
          }
          const metaData = result[i].data["Meta Data"];
          var name = metaData["2. Symbol"];
          let stocks = 0;
          for (var i in stocksOwned) {
            var item = stocksOwned[i];
            if (item["name"] === name) stocks = item["stocks"];
          }
          list.push({
            name,
            stocks,
            data: sublist,
          });
        }
        res.json(list);
      })
    )
    .catch((err) => {
      console.log(err);
    });
});

export { router as stockRoutes };
