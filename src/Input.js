import { useState } from "react";
import Modal from "./Modal.js";

const Input = () => {
  const [inputType, setInputType] = useState("Expense");
  const [transactionType, setTransactionType] = useState("stocks");
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState("");
  const [payee, setPayee] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [addPayee, setAddPayee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [payeeList, setPayeeList] = useState(["ABC", "XYZ"]);

  const handleInputTypeChange = (e) => setInputType(e.target.value);

  const handlePayeeChange = (e) => {
    setPayee(e.target.value);
    if (e.target.value === "") {
      setPayee("select");
      setShowModal(true);
    }
  };

  const handleClose = () => {
    if (addPayee !== "") {
      setPayee(addPayee);
      payeeList.push(addPayee);
      setAddPayee("");
      setPayeeList(payeeList);
    }
    setShowModal(false);
  };

  return (
    <div className="input">
      <h2>Add New {inputType}</h2>
      <Modal
        show={showModal}
        closingText="Add"
        setShowModal={setShowModal}
        handleClose={handleClose}
      >
        <h2>Add a new Payee/Payer</h2>
        <form>
          <label>Payee/Payer Name: </label>
          <input
            type="text"
            required
            value={addPayee}
            onChange={(e) => setAddPayee(e.target.value)}
          />
        </form>
      </Modal>
      <form>
        <input
          type="radio"
          name="type"
          value="Expense"
          defaultChecked
          onChange={handleInputTypeChange}
        />
        Expense
        <input
          type="radio"
          name="type"
          value="Income"
          onChange={handleInputTypeChange}
        />
        Income
        <br />
        <label>Where did you made this transaction?</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="stocks">Stocks</option>
          <option value="crypto">Crypto</option>
          <option value="subscriptions">Monthly Subscriptions</option>
          <option value="transactions">Transactions</option>
        </select>
        <br />
        <label>Transaction Amount: </label>
        <input
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <label>Date of Transaction: </label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>{inputType === "Expense" ? "Payee" : "Payer"}: </label>
        <select value={payee} onChange={handlePayeeChange}>
          <option value="select" disabled>
            --Select a Payee--
          </option>
          {payeeList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
          <option className="disabled" disabled>
            &nbsp;
          </option>
          <option value="">+Add payee/payer</option>
        </select>
        <br />
        <label>Mode of payment: </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Debit/Credit Card</option>
          <option value="net-banking">Net Banking</option>
          <option value="neft/rtgs">NEFT/RTGS</option>
          <option value="upi">UPI</option>
          <option value="others">Others</option>
        </select>
        <br />
        <label>Notes: </label>
        <textarea
          value={note}
          placeholder="(Optional)"
          rows="5"
          cols="20"
          onChange={(e) => setNote(e.target.value)}
        />
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default Input;
