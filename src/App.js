import "./App.css";
import { FaHome , FaWpforms } from 'react-icons/fa'
import { BsGraphUp, BsCurrencyBitcoin } from 'react-icons/bs'
import { BiMoney, BiDollar } from 'react-icons/bi'
import { GiStairsGoal } from 'react-icons/gi'
import { IconContext } from "react-icons/lib";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <div className="home-tag">
          <IconContext.Provider value={{ className: 'home-icon' }}>
            <FaHome />
          </IconContext.Provider>
          <a href="">Dashboard</a>
        </div>
        <br/>
        <div className="input-tag">
          <IconContext.Provider value={{ className: 'input-icon' }}>
            <FaWpforms />
          </IconContext.Provider>
        <a href="">Input Page</a>
        </div>
        <br/>
        <div className="stock-tag">
          <IconContext.Provider value={{ className: 'stock-icon' }}>
            <BsGraphUp />
          </IconContext.Provider>
        <a href="">Stock Page</a>
        </div>
        <br/>
        <div className="crypto-tag">
          <IconContext.Provider value={{ className: 'crypto-icon' }}>
            <BsCurrencyBitcoin />
          </IconContext.Provider>
        <a href="">Crypto Page</a>
        </div>
        <br/>
        <div className="subscription-tag">
          <IconContext.Provider value={{ className: 'subscription-icon' }}>
            <BiMoney />
          </IconContext.Provider>
        <a href="">Subscription Page</a>
        </div>
        <br/>
        <div className="budget-tag">
          <IconContext.Provider value={{ className: 'budget-icon' }}>
            <BiDollar />
          </IconContext.Provider>
        <a href="">Budget Page</a>
        </div>
        <br/>
        <div className="goals-tag">
          <IconContext.Provider value={{ className: 'goals-icon' }}>
            <GiStairsGoal />
          </IconContext.Provider>
        <a href="">Goals Page</a>
        </div>
      </div>
      <div className="main-page">
        <p>This is the main page</p>
      </div>
    </div>
  );
}

export default App;
