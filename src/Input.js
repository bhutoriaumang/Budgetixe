import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  Autocomplete,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Modal from "./components/Modal.js";
import Loading from "./components/Loading.js";
import cryptoList from "./assets/crypto-list.csv";
import stocksList from "./assets/stocks-list.csv";
import saveData from "./hooks/saveData.js";
import Papa from "papaparse";

const Input = () => {
  const [inputType, setInputType] = useState("Expense");
  const [transactionType, setTransactionType] = useState("Stock");
  const [cryptoRecords, setCryptoRecords] = useState([]);
  const [stocksRecords, setStocksRecords] = useState([]);
  const [recordName, setRecordName] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(0.0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [note, setNote] = useState("");
  const [addPayee, setAddPayee] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [payeeList, setPayeeList] = useState(["ABC", "XYZ"]);
  const history = useHistory();

  useEffect(() => {
    Papa.parse(stocksList, {
      download: true,
      delimiter: ",",
      complete: (input) => {
        setStocksRecords(input.data);
      },
    });
    Papa.parse(cryptoList, {
      download: true,
      delimiter: ",",
      complete: (input) => {
        setCryptoRecords(input.data);
      },
    });
  }, []);

  const inputStyle = {
    width: "220px",
    marginLeft: "10px",
  };

  const handleInputTypeChange = (e) => setInputType(e.target.value);

  const handleTransationTypeChange = (e) => {
    setTransactionType(e.target.value);
    if (e.target.value !== "Transactions") setRecordName(null);
    else setRecordName("select");
  };

  const handlePayeeChange = (e) => {
    setRecordName(e.target.value);
    if (e.target.value === "") {
      setRecordName("select");
      setShowModal(true);
    }
  };

  const handleClose = () => {
    if (addPayee !== "") {
      setRecordName(addPayee);
      payeeList.push(addPayee);
      setAddPayee("");
      setPayeeList(payeeList);
    }
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const transaction = {
      inputType,
      transactionType,
      recordName,
      transactionAmount,
      transactionDate,
      paymentMethod,
      note,
    };

    const { msg, status } = await saveData("transaction", transaction);
    if (status === 200) {
      history.push("/");
    } else {
      alert(msg);
    }
  };

  return (
    <div className="container">
      {!cryptoRecords && !stocksRecords ? (
        <Loading />
      ) : (
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
              <RadioGroup
                row
                value={inputType}
                onChange={handleInputTypeChange}
              >
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
                  onChange={handleTransationTypeChange}
                >
                  <MenuItem value="Stock">Stocks</MenuItem>
                  <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
                  <MenuItem value="Subscription">
                    Monthly Subscriptions
                  </MenuItem>
                  <MenuItem value="Transactions">Transactions</MenuItem>
                </Select>
              </label>
            </FormControl>

            {transactionType !== "Transactions" && (
              <FormControl className="form-control">
                <label>
                  {transactionType} Name:
                  <Autocomplete
                    options={
                      transactionType === "Stock"
                        ? stocksRecords.map((item) => `${item[1]} (${item[0]})`)
                        : transactionType === "Cryptocurrency"
                        ? cryptoRecords.map((item) => `${item[1]} (${item[0]})`)
                        : []
                    }
                    style={inputStyle}
                    value={recordName}
                    onChange={(e, val) => setRecordName(val)}
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={`--Select ${transactionType}--`}
                      />
                    )}
                  />
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
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
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
                    value={transactionDate}
                    onChange={setTransactionDate}
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
                    value={recordName}
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
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Debit/Credit Card">
                    Debit/Credit Card
                  </MenuItem>
                  <MenuItem value="Net Banking">Net Banking</MenuItem>
                  <MenuItem value="NEFT/RTGS">NEFT/RTGS</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
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
              <Button variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Input;
