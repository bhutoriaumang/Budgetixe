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
          <Link to="/dashboard">
            <div className="dashboard-tag">
              <IconContext.Provider value={{ className: "dashboard-icon" }}>
                <FaHome />
              </IconContext.Provider>
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/input">
            <div className="input-tag">
              <IconContext.Provider value={{ className: "input-icon" }}>
                <FaWpforms />
              </IconContext.Provider>
              <p>Input</p>
            </div>
          </Link>
          <Link to="/stock">
            <div className="stock-tag">
              <IconContext.Provider value={{ className: "stock-icon" }}>
                <BsGraphUp />
              </IconContext.Provider>
              <p>Stock</p>
            </div>
          </Link>
          <Link to="/crypto">
            <div className="crypto-tag">
              <IconContext.Provider value={{ className: "crypto-icon" }}>
                <BsCurrencyBitcoin />
              </IconContext.Provider>
              <p>Crypto</p>
            </div>
          </Link>
          <Link to="/budget">
            <div className="budget-tag">
              <IconContext.Provider value={{ className: "budget-icon" }}>
                <BiDollar />
              </IconContext.Provider>
              <p>Budget</p>
            </div>
          </Link>
          <Link to="/subscription">
            <div className="subscription-tag">
              <IconContext.Provider value={{ className: "subscription-icon" }}>
                <BiMoney />
              </IconContext.Provider>
              <p>Subscription</p>
            </div>
          </Link>
          <Link to="/goals">
            <div className="goals-tag">
              <IconContext.Provider value={{ className: "goals-icon" }}>
                <GiStairsGoal />
              </IconContext.Provider>
              <p>Goals</p>
            </div>
          </Link>
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
