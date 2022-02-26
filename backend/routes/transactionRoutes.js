import express from "express";
const router = express.Router();

import Transaction from "../models/transaction.js";

router.get("/", (req, res) => {
  Transaction.find()
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).json("Error Occurred: " + err));
});

router.post("/", (req, res) => {
  const inputType = req.body.inputType;
  const transactionType = req.body.transactionType;
  const recordName = req.body.recordName;
  const transactionAmount = req.body.transactionAmount;
  const transactionDate = new Date(req.body.transactionDate);
  const paymentMethod = req.body.paymentMethod;
  const note = req.body.note;

  const transaction = new Transaction({
    inputType,
    transactionType,
    recordName,
    transactionAmount,
    transactionDate,
    paymentMethod,
    note,
  });

  transaction
    .save()
    .then(() => res.json("Transaction saved succesfully !"))
    .catch((err) => res.status(400).json("Error Occurred: " + err));
});

export { router as transactionRoutes };
