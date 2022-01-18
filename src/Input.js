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
  const [showModal, setShowModal] = useState(false);
  const [payeeList, setPayeeList] = useState(["ABC", "XYZ"]);

  const handleInputTypeChange = (e) => setInputType(e.target.value);

  const handlePayeeChange = (e) => {
    setPayee(e.target.value);
    if (e.target.value === "add") {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    payeeList.push(payee);
    setPayeeList(payeeList);
    setShowModal(false);
  };

  return (
    <div className="input">
      <h2>Add New {inputType}</h2>
      <Modal show={showModal} closingText="Add" handleClose={handleClose}>
        <h2>Add a new Payee/Payer</h2>
        <label>Payee/Payer Name: </label>
        <input
          type="text"
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
        />
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
          <option value="budget">Daily Budget</option>
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
          <option value="select">--Select a Payee--</option>
          {payeeList.map((item) => (
            <option value={item}>{item}</option>
          ))}
          <option value="add">+Add payee/payer</option>
        </select>
        <br />
        <label>Mode of payment: </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Debit/Credit Card</option>
          <option value="transfer">Bank Transfer</option>
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
      </form>
    </div>
  );
};

export default Input;
