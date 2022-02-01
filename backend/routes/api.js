import express from "express";
const router = express.Router();

import { cryptoRoutes } from "./cryptoRoutes.js";

router.use("/crypto", cryptoRoutes);

export { router as apiRoutes };
