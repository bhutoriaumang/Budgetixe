import express from "express";
import axios from "axios";
const router = express.Router();

import { CRYPTO_DATA_URL } from "../constants.js";

var cryptoOwned = [
  { name: "BTC", crypto: 500 },
  { name: "DOGE", crypto: 100 },
];

router.get("/", (req, res) => {
  var getList = [];
  cryptoOwned.forEach((item) =>
    getList.push(axios.get(`${CRYPTO_DATA_URL}&symbol=${item.name}`))
  );
  axios
    .all(getList)
    .then(
      axios.spread((...result) => {
        let list = [];
        for (var i in result) {
          const data = result[i].data["Time Series (Digital Currency Daily)"];
          let sublist = [];
          for (var key in data) {
            sublist.push({
              name: key,
              value: parseFloat(data[key]["4a. close (USD)"]),
            });
          }
          const metaData = result[i].data["Meta Data"];
          var name = metaData["2. Digital Currency Code"];
          let crypto = 0;
          for (var i in cryptoOwned) {
            var item = cryptoOwned[i];
            if (item["name"] === name) crypto = item["crypto"];
          }
          list.push({
            name,
            crypto,
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

export { router as cryptoRoutes };
