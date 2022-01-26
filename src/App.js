import "./App.css";
import { FaHome, FaWpforms } from "react-icons/fa";
import { BsGraphUp, BsCurrencyBitcoin } from "react-icons/bs";
import { BiMoney, BiDollar } from "react-icons/bi";
import { GiStairsGoal } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Input from "./Input";
import Stock from "./Stock";
import Crypto from "./Crypto";
import Transactions from "./Transactions";
import Subscription from "./Subscription";
import Goals from "./Goals";
import Error404 from "./Error404";
import Navbar from "./Navbar";
import { useState } from "react";

function App() {
  const [error, setError] = useState(false);

  return (
    <Router>
      <div className="App">
        {!error && <Navbar />}
        <div className="main-page">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                setError(false);
                return <Dashboard />;
              }}
            ></Route>
            <Route exact path="/input">
              <Input />
            </Route>
            <Route exact path="/stock">
              <Stock />
            </Route>
            <Route exact path="/crypto">
              <Crypto />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/subscription">
              <Subscription />
            </Route>
            <Route exact path="/goals">
              <Goals />
            </Route>
            <Route
              path="/*"
              render={() => {
                setError(true);
                return <Error404 />;
              }}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
