import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    inputType: { type: String, enum: ["Expense", "Income"], required: true },
    transactionType: {
      type: String,
      enum: ["Stock", "Cryptocurrency", "Subscription", "Transactions"],
      required: true,
    },
    recordName: { type: String, trim: true, required: true },
    transactionAmount: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "Debit/Credit Card",
        "Net Banking",
        "NEFT/RTGS",
        "UPI",
        "Others",
      ],
      required: true,
    },
    note: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
