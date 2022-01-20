import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample chart data

const Stock = () => {
  const [pdata, setPdata] = useState([]);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [priceChange, setPriceChange] = useState(0.0);
  const baseURL = "http://localhost:3000/stock";
  useEffect(() => {
    const fetchStock = (symbol) => {
      const API_KEY = "5ESBFJPMQ7O56KWH";
      let StockSymbol = symbol;
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&&apikey=${API_KEY}`;

      fetch(API_Call)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var list = [];
          for (var key in data["Time Series (Daily)"]) {
            var date =
              key.substr(8) + "/" + key.substr(5, 2) + "/" + key.substr(2, 2);
            list.push({
              name: key,
              value: parseFloat(data["Time Series (Daily)"][key]["4. close"]),
            });
          }
          // list.length = 5;
          setPriceChange(list[0]["value"] - list[1]["value"]);
          list = list.reverse();
          setPdata(list);
          setIsDataPresent(true);
        });
    };

    fetchStock("MSFT");
  }, [baseURL]);
  return (
    <div className="stock-page">
      {!isDataPresent && <p>Loading...</p>}
      <div className="stock-graph">
        {isDataPresent && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={pdata}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                fontSize="0"
                interval={"preserveStartEnd"}
              />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      {isDataPresent && (
        <div className="side-cards">
          <div className="stock-info">
            <div className="stock-value">
              ${pdata[pdata.length - 1]["value"]}
            </div>
            {priceChange <= 0 ? (
              <div className="stock-data">
                <p className="stock-red">{priceChange.toFixed(2)}</p>{" "}
                <p className="stock-red">
                  {" "}
                  {(
                    (priceChange * 100) /
                    pdata[pdata.length - 2]["value"]
                  ).toFixed(2)}
                  %
                </p>
              </div>
            ) : (
              <div className="stock-data">
                <p className="stock-green">+{priceChange.toFixed(2)}</p>{" "}
                <p className="stock-green">
                  {" "}
                  {(
                    (priceChange * 100) /
                    pdata[pdata.length - 2]["value"]
                  ).toFixed(2)}
                  %
                </p>
              </div>
            )}
        </div>
              <div className="stock-net"></div>      
        </div>
      )}
    </div>
  );
};

export default Stock;
