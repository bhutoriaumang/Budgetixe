import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Modal from "./components/Modal.js";

const Input = () => {
  const [inputType, setInputType] = useState("Expense");
  const [transactionType, setTransactionType] = useState("stocks");
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState(new Date());
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
    <div className="container">
      <div className="input">
        <h2>Add New {inputType}</h2>
        <Modal showModal={showModal} handleClose={handleClose}>
          <div className="input-modal">
            <h2>Add a new Payee/Payer</h2>
            <form>
              <label>Payee/Payer Name: </label>
              <TextField
                size="small"
                required
                value={addPayee}
                onChange={(e) => setAddPayee(e.target.value)}
              />
              <div className="button-container">
                <Button variant="contained" onClick={handleClose}>
                  +Add
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <form className="input-form">
          <FormControl id="abc" className="form-control">
            <RadioGroup row value={inputType} onChange={handleInputTypeChange}>
              <FormControlLabel
                value="Expense"
                control={<Radio size="small" />}
                label="Expense"
              />
              <FormControlLabel
                value="Income"
                control={<Radio size="small" />}
                label="Income"
              />
            </RadioGroup>
          </FormControl>

          <FormControl className="form-control">
            <label>Where did you made this transaction?</label>
            <Select
              size="small"
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
              size="small"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>

          <FormControl className="form-control">
            <label>Date of Transaction: </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                size="small"
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                value={date}
                onChange={setDate}
              />
            </MuiPickersUtilsProvider>
          </FormControl>

          <FormControl className="form-control">
            <label>{inputType === "Expense" ? "Payee" : "Payer"}: </label>
            <Select size="small" value={payee} onChange={handlePayeeChange}>
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

          <FormControl size="small" className="form-control">
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
              size="small"
              value={note}
              placeholder="(Optional)"
              multiline
              minRows={2}
              onChange={(e) => setNote(e.target.value)}
            />
          </FormControl>
          <div className="button-container">
            <Button variant="contained">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
