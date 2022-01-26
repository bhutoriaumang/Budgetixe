import { FaHome, FaWpforms } from "react-icons/fa";
import { BsGraphUp, BsCurrencyBitcoin } from "react-icons/bs";
import { BiMoney, BiDollar } from "react-icons/bi";
import { GiStairsGoal } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <FaHome />
          </IconContext.Provider>
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to="/input">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <FaWpforms />
          </IconContext.Provider>
          <p>Input</p>
        </div>
      </Link>
      <Link to="/stock">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <BsGraphUp />
          </IconContext.Provider>
          <p>Stock</p>
        </div>
      </Link>
      <Link to="/crypto">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <BsCurrencyBitcoin />
          </IconContext.Provider>
          <p>Crypto</p>
        </div>
      </Link>
      <Link to="/transactions">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <BiDollar />
          </IconContext.Provider>
          <p>Transactions</p>
        </div>
      </Link>
      <Link to="/subscription">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <BiMoney />
          </IconContext.Provider>
          <p>Subscription</p>
        </div>
      </Link>
      <Link to="/goals">
        <div className="navbar-tag">
          <IconContext.Provider value={{ className: "navbar-icon" }}>
            <GiStairsGoal />
          </IconContext.Provider>
          <p>Goals</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
