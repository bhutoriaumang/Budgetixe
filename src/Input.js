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
  const [transactionType, setTransactionType] = useState("Stock");
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState(new Date());
  const [payee, setPayee] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [addPayee, setAddPayee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [payeeList, setPayeeList] = useState(["ABC", "XYZ"]);

  const inputStyle = {
    width: "220px",
    marginLeft: "10px",
  };

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
            <label>
              Where did you made this transaction?
              <Select
                size="small"
                style={inputStyle}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <MenuItem value="Stock">Stocks</MenuItem>
                <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
                <MenuItem value="Subscription">Monthly Subscriptions</MenuItem>
                <MenuItem value="Transactions">Transactions</MenuItem>
              </Select>
            </label>
          </FormControl>

          {transactionType !== "Transactions" && (
            <FormControl className="form-control">
              <label>
                {transactionType} Name:
                <Select
                  size="small"
                  style={inputStyle}
                  // value={transactionType}
                  // onChange={(e) => setTransactionType(e.target.value)}
                ></Select>
              </label>
            </FormControl>
          )}

          <FormControl variant="filled" className="form-control">
            <label>
              {transactionType === "Transactions"
                ? "Transaction Amount:"
                : `${transactionType} Price:`}

              <TextField
                size="small"
                type="number"
                style={inputStyle}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </FormControl>

          <FormControl className="form-control">
            <label>
              Date of{" "}
              {transactionType === "Transactions"
                ? "Transaction:"
                : "Purchase:"}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  size="small"
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  style={inputStyle}
                  value={date}
                  onChange={setDate}
                />
              </MuiPickersUtilsProvider>
            </label>
          </FormControl>

          {transactionType === "Transactions" && (
            <FormControl className="form-control">
              <label>
                {inputType === "Expense" ? "Payee" : "Payer"}:
                <Select
                  size="small"
                  value={payee}
                  style={inputStyle}
                  onChange={handlePayeeChange}
                >
                  <MenuItem value="select" disabled>
                    <em>--Select a Payee--</em>
                  </MenuItem>
                  {payeeList.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                  <MenuItem value="">+Add payee/payer</MenuItem>
                </Select>
              </label>
            </FormControl>
          )}

          <FormControl size="small" className="form-control">
            <label>
              Mode of payment:
              <Select
                value={paymentMethod}
                style={inputStyle}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Debit/Credit Card</MenuItem>
                <MenuItem value="net-banking">Net Banking</MenuItem>
                <MenuItem value="neft/rtgs">NEFT/RTGS</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </label>
          </FormControl>

          <FormControl className="form-control">
            <label>
              Notes:
              <TextField
                size="small"
                value={note}
                style={inputStyle}
                placeholder="(Optional)"
                multiline
                minRows={2}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
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
