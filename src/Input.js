import { useState } from "react";
import Modal from "./Modal.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const Input = () => {
  const [inputType, setInputType] = useState("Expense");
  const [transactionType, setTransactionType] = useState("stocks");
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState("");
  const [payee, setPayee] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("cash");
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
      <form className="input-form">
        <FormControl id="abc" className="form-control">
          <RadioGroup row value={inputType} onChange={handleInputTypeChange}>
            <FormControlLabel
              value="Expense"
              control={<Radio />}
              label="Expense"
            />
            <FormControlLabel
              value="Income"
              control={<Radio />}
              label="Income"
            />
          </RadioGroup>
        </FormControl>

        <FormControl variant="filled" className="form-control">
          <label>Where did you made this transaction?</label>
          <Select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <MenuItem value="stocks">Stocks</MenuItem>
            <MenuItem value="crypto">Crypto</MenuItem>
            <MenuItem value="subscriptions">Monthly Subscriptions</MenuItem>
            <MenuItem value="transactions">Transactions</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className="form-control">
          <label>Transaction Amount: </label>
          <TextField
            variant="filled"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>

        <label>Date of Transaction: </label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <FormControl variant="filled" className="form-control">
          <label>{inputType === "Expense" ? "Payee" : "Payer"}: </label>
          <Select value={payee} onChange={handlePayeeChange}>
            <MenuItem value="select" disabled>
              <em>--Select a Payee--</em>
            </MenuItem>
            {payeeList.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
            <option className="disabled" disabled>
              &nbsp;
            </option>
            <MenuItem value="">+Add payee/payer</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className="form-control">
          <label>Mode of payment: </label>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="card">Debit/Credit Card</MenuItem>
            <MenuItem value="net-banking">Net Banking</MenuItem>
            <MenuItem value="neft/rtgs">NEFT/RTGS</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="form-control">
          <label>Notes:</label>
          <TextField
            variant="filled"
            value={note}
            placeholder="(Optional)"
            multiline
            minRows={3}
            onChange={(e) => setNote(e.target.value)}
          />
        </FormControl>

        <Button variant="contained">Save</Button>
      </form>
    </div>
  );
};

export default Input;
