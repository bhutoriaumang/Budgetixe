import { useState, useEffect } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Chart from "./components/Chart";
import Loading from "./components/Loading";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useFetch from "./hooks/useFetch";
import { Select, MenuItem } from "@mui/material";

const Stock = () => {
  const [pdata, setPdata] = useState([]);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [priceChange, setPriceChange] = useState(0.0);
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedStockValue, setSelectedStockValue] = useState(0);
  const [graphData, setGraphData] = useState({});

  const { data: stocksOwned, isPending } = useFetch(
    `http://localhost:8000/stocks`
  );

  useEffect(() => {
    if (stocksOwned) {
      for (var i in stocksOwned) {
        const item = stocksOwned[i];
        const symbol = item.name;
        const data = item.data;
        let x = graphData;
        x[symbol] = data.reverse();
        setGraphData(x);
        let t = x[selectedStock];
        if (t) {
          setPriceChange(t[t.length - 1]["value"] - t[t.length - 2]["value"]);
          setPdata(t);
          setIsDataPresent(true);
        }
      }
      setSelectedStock(stocksOwned[0].name);
    }
  }, [stocksOwned]);

  useEffect(() => {
    if (Object.keys(graphData).length !== 0) {
      let list = graphData[selectedStock];
      if (list) {
        setPriceChange(
          list[list.length - 1]["value"] - list[list.length - 2]["value"]
        );
        setPdata(list);
        setIsDataPresent(true);
      }
    }
  }, [selectedStock]);

  const handleStockChanged = (e) => {
    var name = e.target.value;
    let value = 0;
    for (var i in stocksOwned) {
      var item = stocksOwned[i];
      if (item["name"] === name) value = item["stocks"];
    }
    setSelectedStock(name);
    setSelectedStockValue(value);
  };

  var fontSize = Math.min(0.02 * window.innerHeight, 0.012 * window.innerWidth);
  return (
    <div className="total-stock-page">
      {!isPending && (
        <div className="dropdown">
          <Select
            size="small"
            name="Stock"
            id="stock"
            value={selectedStock}
            onChange={handleStockChanged}
          >
            {stocksOwned &&
              stocksOwned.map((item) => (
                <MenuItem value={item.name} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </div>
      )}
      <div className="stock-page">
        {!isDataPresent && <Loading />}
        {isDataPresent && (
          <div className="stock-graph">
            {isDataPresent && <Chart pdata={pdata} priceChange={priceChange} />}
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
      {isDataPresent && (
        <div className="bottom-table">
          <Paper
            sx={{
              width: "90%",
              overflow: "hidden",
              backgroundColor: "transparent",
              margin: "auto",
              borderRadius: "5px",
            }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                        fontSize: "80%",
                      }}
                    >
                      Stock Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                        fontSize: "80%",
                      }}
                    >
                      Stocks Owned
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                        fontSize: "80%",
                      }}
                    >
                      Stock CP
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                        fontSize: "80%",
                      }}
                    >
                      Stock Current Price
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid black",
                        fontSize: "80%",
                      }}
                    >
                      Net Profit/Loss
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocksOwned.map((stock) => {
                    return (
                      <TableRow key={stock.name}>
                        <TableCell sx={{ fontSize: "80%" }}>
                          {stock["name"]}
                        </TableCell>
                        <TableCell sx={{ fontSize: "80%" }}>
                          {stock["stocks"]}
                        </TableCell>
                        <TableCell sx={{ fontSize: "80%" }}>
                          {pdata[pdata.length - 2]["value"].toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ fontSize: "80%" }}>
                          {pdata[pdata.length - 1]["value"]} USD
                        </TableCell>
                        <TableCell
                          sx={{
                            color: priceChange > 0 ? "green" : "red",
                            fontSize: "80%",
                          }}
                        >
                          {(
                            (pdata[pdata.length - 1]["value"] - priceChange) *
                            stock["stocks"]
                          ).toFixed(2)}{" "}
                          USD
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default Stock;
