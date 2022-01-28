import { useState, useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Chart from "./components/Chart";
import Loading from "./Loading";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
          let t = x[selectedStock];
          if(t){
            setPriceChange(t[t.length - 1]["value"] - t[t.length - 2]["value"]);
            setPdata(t);
            setIsDataPresent(true);
          }
        }).catch((err)=>{
          console.log(err.message);
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
    if (Object.keys(graphData).length !== 0) {
      let list = graphData[selectedStock];
      if(list){
        setPriceChange(
          list[list.length - 1]["value"] - list[list.length - 2]["value"]
        );
        setPdata(list);
        setIsDataPresent(true);
      }
    }
  }, [selectedStock]);

  const stockChanged = () => {
    let select_element = document.getElementById("stock");
    setSelectedStock(select_element.options[select_element.selectedIndex].text);
    setSelectedStockValue(
      select_element.options[select_element.selectedIndex].value
    );
  };

  var fontSize = Math.min(0.02*window.innerHeight,0.012*window.innerWidth);
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
              <Chart pdata={pdata} priceChange={priceChange}/>
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
      {isDataPresent && 
        <div className="bottom-table">
        <Paper sx={{ width: "90%", overflow: "hidden", backgroundColor: "transparent", margin:"auto", borderRadius:"5px"}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:"bold", borderBottom:"1px solid black", fontSize:"80%"}}>Stock Name</TableCell>
                <TableCell sx={{fontWeight:"bold", borderBottom:"1px solid black", fontSize:"80%"}}>Stocks Owned</TableCell>
                <TableCell sx={{fontWeight:"bold", borderBottom:"1px solid black", fontSize:"80%"}}>Stock CP</TableCell>
                <TableCell sx={{fontWeight:"bold", borderBottom:"1px solid black", fontSize:"80%"}}>Stock Current Price</TableCell>
                <TableCell sx={{fontWeight:"bold", borderBottom:"1px solid black", fontSize:"80%"}}>Net Profit/Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocksOwned.map((stock)=>{
                return (
                  <TableRow>
                    <TableCell sx={{fontSize:"80%"}}>{stock["name"]}</TableCell>
                    <TableCell sx={{fontSize:"80%"}}>{stock["stocks"]}</TableCell>
                    <TableCell sx={{fontSize:"80%"}}>{pdata[pdata.length - 2]["value"].toFixed(2)}</TableCell>
                    <TableCell sx={{fontSize:"80%"}}>{pdata[pdata.length - 1]["value"]} USD</TableCell>
                    <TableCell sx={{color: (priceChange>0)?"green":"red", fontSize:"80%"}}>{((pdata[pdata.length - 1]["value"] - priceChange)*stock["stocks"]).toFixed(2)} USD</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
      }
    </div>
  );
};

export default Stock;
