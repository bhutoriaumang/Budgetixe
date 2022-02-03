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
import { Select, MenuItem, FormControl } from "@mui/material";

const Crypto = () => {
  const { data: cryptoOwned, isPending, error } = useFetch("http://localhost:8000/crypto/");
  const [pdata, setPdata] = useState([]);
  const [isDataPresent, setIsDataPresent] = useState(false);
  const [priceChange, setPriceChange] = useState(0.0);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedCryptoValue, setSelectedCryptoValue] = useState(0);
  const [graphData, setGraphData] = useState({});
  
  useEffect(() => {
    if (cryptoOwned) {
      for (var i in cryptoOwned) {
        const item = cryptoOwned[i];
        const symbol = item.name;
        const data = item.data;
        let x = graphData;
        x[symbol] = data.reverse();
        setGraphData(x);
        let t = x[selectedCrypto];
        if (t) {
          setPriceChange(t[t.length - 1]["value"] - t[t.length - 2]["value"]);
          setPdata(t);
          setIsDataPresent(true);
        }
      }
      setSelectedCrypto(cryptoOwned[0].name);
      setSelectedCryptoValue(cryptoOwned[0].crypto);
    }
  }, [cryptoOwned]);

  useEffect(() => {
    if (Object.keys(graphData).length !== 0) {
      let list = graphData[selectedCrypto];
      if (list) {
        setPriceChange(
          list[list.length - 1]["value"] - list[list.length - 2]["value"]
        );
        setPdata(list);
        setIsDataPresent(true);
      }
    }
  }, [selectedCrypto]);

  const handleCryptoChanged = (e) => {
    var name = e.target.value;
    let value = 0;
    for (var i in cryptoOwned) {
      var item = cryptoOwned[i];
      if (item["name"] === name) {
        value = item["crypto"];
      }
    }
    setSelectedCrypto(name);
    setSelectedCryptoValue(value);
  };

  return (
    <div className="total-stock-page">
      {!isPending && (
        <FormControl className="dropdown" variant="standard">
          <Select
            size="small"
            name="Crypto"
            id="stock"
            value={selectedCrypto}
            onChange={handleCryptoChanged}
          >
            {cryptoOwned &&
              cryptoOwned.map((item) => (
                <MenuItem value={item.name} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
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
            <div className="stock-name">{selectedCrypto}</div>
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
              <div className="stock-currentval-label">Cryptos Owned</div>
              <div className="stock-currentval-value">{selectedCryptoValue}</div>
            </div>
            <div className="stock-currentval">
              <div className="stock-currentval-label">Net Profit/Loss</div>
              <div className={priceChange <= 0 ? "red " : "green "}>
                {priceChange > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
                {(selectedCryptoValue * priceChange).toFixed(2)} USD
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
                    <TableCell className="table-cell">Crypto Name</TableCell>
                    <TableCell className="table-cell">Cryptos Owned</TableCell>
                    <TableCell className="table-cell">Crypto CP</TableCell>
                    <TableCell className="table-cell">
                      Crypto Current Price
                    </TableCell>
                    <TableCell className="table-cell">
                      Net Profit/Loss
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ fontSize: "80%" }}>
                  {cryptoOwned.map((crypto) => {
                    return (
                      <TableRow key={crypto.name}>
                        <TableCell>{crypto["name"]}</TableCell>
                        <TableCell>{crypto["crypto"]}</TableCell>
                        <TableCell>
                          {graphData[crypto.name][
                            graphData[crypto.name].length - 2
                          ]["value"].toFixed(2)}{" "}
                          USD
                        </TableCell>
                        <TableCell>
                          {
                            graphData[crypto.name][
                              graphData[crypto.name].length - 1
                            ]["value"]
                          }{" "}
                          USD
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              graphData[crypto.name][
                                graphData[crypto.name].length - 1
                              ]["value"] -
                                graphData[crypto.name][
                                  graphData[crypto.name].length - 2
                                ]["value"] >
                              0
                                ? "green"
                                : "red",
                          }}
                        >
                          {(
                            (graphData[crypto.name][
                              graphData[crypto.name].length - 1
                            ]["value"] -
                              graphData[crypto.name][
                                graphData[crypto.name].length - 2
                              ]["value"]) *
                            crypto["crypto"]
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

export default Crypto;
