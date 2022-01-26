import { useState, useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";

var stocksOwned = [
  { name: "MSFT", stocks: 500 },
  { name: "IBM", stocks: 100 },
];

const Stock = () => {
  const [pdata, setPdata] = useState([]);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [priceChange, setPriceChange] = useState(0.0);
  const [selectedStock, setSelectedStock] = useState(stocksOwned[0]["name"]);
  const [selectedStockValue, setSelectedStockValue] = useState(
    stocksOwned[0]["stocks"]
  );
  const [graphData, setGraphData] = useState({});

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
          let list = [];
          for (var key in data["Time Series (Daily)"]) {
            list.push({
              name: key,
              value: parseFloat(data["Time Series (Daily)"][key]["4. close"]),
            });
          }
          let x = graphData;
          x[symbol] = list.reverse();
          setGraphData(x);
          let t = graphData[selectedStock];
          setPriceChange(t[t.length - 1]["value"] - t[t.length - 2]["value"]);
          setPdata(t);
          setIsDataPresent(true);
        });
    };
    let select_element = document.getElementById("stock");
    for (var i = 0; i < stocksOwned.length; i++) {
      let newOption = new Option(
        stocksOwned[i]["name"],
        stocksOwned[i]["stocks"]
      );
      fetchStock(stocksOwned[i]["name"]);
      select_element.appendChild(newOption);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(graphData).length != 0) {
      let list = graphData[selectedStock];
      setPriceChange(
        list[list.length - 1]["value"] - list[list.length - 2]["value"]
      );
      setPdata(list);
      setIsDataPresent(true);
    }
  }, [selectedStock]);

  const stockChanged = () => {
    let select_element = document.getElementById("stock");
    setSelectedStock(select_element.options[select_element.selectedIndex].text);
    setSelectedStockValue(
      select_element.options[select_element.selectedIndex].value
    );
  };

  return (
    <div className="total-stock-page">
      <div className="dropdown">
        <select name="Stock" id="stock" onChange={stockChanged}></select>
      </div>
      <div className="stock-page">
        {!isDataPresent && <Loading />}
        {isDataPresent && (
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
                    stroke={priceChange > 0 ? "green" : "red"}
                    fill={priceChange > 0 ? "lightgreen" : "lightcoral"}
                    fillOpacity="0.3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
        {isDataPresent && (
          <div className="side-cards">
            <div className="stock-name">{selectedStock}</div>
            <div className="stock-currentval">
              <div className="stock-currentval-label">Current Value</div>
              <div className="stock-currentval-value">
                {pdata[pdata.length - 1]["value"]} USD
              </div>
            </div>
            <div className="stock-currentval">
              <div className="stock-currentval-label">Net Inc/Dec</div>
              <div className={priceChange <= 0 ? "red " : "green "}>
                {priceChange > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
                {(
                  (priceChange * 100) /
                  pdata[pdata.length - 2]["value"]
                ).toFixed(2)}
                %
              </div>
            </div>
            <div className="stock-currentval">
              <div className="stock-currentval-label">Stocks Owned</div>
              <div className="stock-currentval-value">{selectedStockValue}</div>
            </div>
            <div className="stock-currentval">
              <div className="stock-currentval-label">Net Profit/Loss</div>
              <div className={priceChange <= 0 ? "red " : "green "}>
                {priceChange > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
                {(selectedStockValue * priceChange).toFixed(2)} USD
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
