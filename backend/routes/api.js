import express from "express";
const router = express.Router();

import { stockRoutes } from "./stockRoutes.js";
import { cryptoRoutes } from "./cryptoRoutes.js";
import { transactionRoutes } from "./transactionRoutes.js";

router.use("/stocks", stockRoutes);
router.use("/crypto", cryptoRoutes);
router.use("/transaction", transactionRoutes);

export { router as apiRoutes };
