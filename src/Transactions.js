import Transactiontable from "./components/TransactionTable";

const Transactions = () => {
  const columns = [
    { id: "date", value: "Date" },
    { id: "type", value: "Type" },
    { id: "payee", value: "Payee" },
    { id: "amount", value: "Amount" },
  ];

  const rows = [
    { id: 1, date: "18/01/22", type: "Cash", payee: "ABC", amount: 50.0 },
    { id: 2, date: "19/01/22", type: "Card", payee: "ABC", amount: -150.0 },
    { id: 3, date: "20/01/22", type: "Cash", payee: "XYZ", amount: 100.0 },
  ];

  return (
    <div className="transactions">
      <Transactiontable columns={columns} rows={rows} />
    </div>
  );
};

export default Transactions;
