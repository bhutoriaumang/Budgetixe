import { useState, useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
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
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&&apikey=${API_KEY}`;

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
  }, []);
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
              }
            }
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
                stroke={ (priceChange>0)?"green":"red" }
                fill={ (priceChange>0)?"lightgreen":"lightcoral" }
                fillOpacity="0.3"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      {isDataPresent && (
        <div className="side-cards">
          <div className="stock-name">MSFT</div>
          <div className="stock-currentval">
            <div className="stock-currentval-label">Current Value</div>
            <div className="stock-currentval-value">{ pdata[pdata.length-1]['value'] } USD</div>
          </div>
          <div className="stock-currentval">
            <div className="stock-currentval-label">Net Inc/Dec</div>
            <div className={ (priceChange<=0)?"red ":"green "}>{ (priceChange>0)?<AiFillCaretUp />:<AiFillCaretDown /> }{ ((priceChange*100)/pdata[pdata.length-2]['value']).toFixed(2) }%</div>
          </div>
          <div className="stock-currentval">
            <div className="stock-currentval-label">Stocks Owned</div>
            <div className="stock-currentval-value">500</div>
          </div>
          <div className="stock-currentval">
            <div className="stock-currentval-label">Net Profit/Loss</div>
            <div className={ (priceChange<=0)?"red ":"green "}>{ (priceChange>0)?<AiFillCaretUp />:<AiFillCaretDown /> }{ (500*priceChange).toFixed(2) } USD</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
