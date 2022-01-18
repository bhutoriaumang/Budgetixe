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
import Budget from "./Budget";
import Subscription from "./Subscription";
import Goals from "./Goals";
import Error404 from "./Error404";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav-bar">
          <Link to="/">
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
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/input">
              <Input />
            </Route>
            <Route exact path="/stock">
              <Stock />
            </Route>
            <Route exact path="/crypto">
              <Crypto />
            </Route>
            <Route exact path="/budget">
              <Budget />
            </Route>
            <Route exact path="/subscription">
              <Subscription />
            </Route>
            <Route exact path="/goals">
              <Goals />
            </Route>
            <Route path="/*">
              <Error404 />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
