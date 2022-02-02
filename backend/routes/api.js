import express from "express";
const router = express.Router();

import { stockRoutes } from "./stockRoutes.js";
import { cryptoRoutes } from "./cryptoRoutes.js";

router.use("/stocks", stockRoutes);
router.use("/crypto", cryptoRoutes);

export { router as apiRoutes };
