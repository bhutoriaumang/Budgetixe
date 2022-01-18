import "./App.css";
import { FaHome, FaWpforms } from "react-icons/fa";
import { BsGraphUp, BsCurrencyBitcoin } from "react-icons/bs";
import { BiMoney, BiDollar } from "react-icons/bi";
import { GiStairsGoal } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Input from "./Input";
import Stock from "./Stock";
import Crypto from "./Crypto";
import Budget from "./Budget";
import Subscription from "./Subscription";
import Goals from "./Goals";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav-bar">
          <div className="home-tag">
            <IconContext.Provider value={{ className: "home-icon" }}>
              <FaHome />
            </IconContext.Provider>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <br />
          <div className="input-tag">
            <IconContext.Provider value={{ className: "input-icon" }}>
              <FaWpforms />
            </IconContext.Provider>
            <Link to="/input">Input Page</Link>
          </div>
          <br />
          <div className="stock-tag">
            <IconContext.Provider value={{ className: "stock-icon" }}>
              <BsGraphUp />
            </IconContext.Provider>
            <Link to="/stock">Stock Page</Link>
          </div>
          <br />
          <div className="crypto-tag">
            <IconContext.Provider value={{ className: "crypto-icon" }}>
              <BsCurrencyBitcoin />
            </IconContext.Provider>
            <Link to="/crypto">Crypto Page</Link>
          </div>
          <br />
          <div className="subscription-tag">
            <IconContext.Provider value={{ className: "subscription-icon" }}>
              <BiMoney />
            </IconContext.Provider>
            <Link to="/subscription">Subscription Page</Link>
          </div>
          <br />
          <div className="budget-tag">
            <IconContext.Provider value={{ className: "budget-icon" }}>
              <BiDollar />
            </IconContext.Provider>
            <Link to="/budget">Budget Page</Link>
          </div>
          <br />
          <div className="goals-tag">
            <IconContext.Provider value={{ className: "goals-icon" }}>
              <GiStairsGoal />
            </IconContext.Provider>
            <Link to="/goals">Goals Page</Link>
          </div>
        </div>
        <div className="main-page">
          <Switch>
            <Route path="/dashboard">
              < Dashboard />
            </Route>
            <Route path="/input">
            < Input />
            </Route>
            <Route path="/stock">
            < Stock />
            </Route>
            <Route path="/crypto">
            < Crypto />
            </Route>
            <Route path="/budget">
            < Budget />
            </Route>
            <Route path="/subscription">
            < Subscription />
            </Route>
            <Route path="/goals">
            < Goals />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
