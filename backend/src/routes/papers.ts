import express from "express";
import { default as Paper } from "../controllers/papers";
import { asyncHandler } from "../middlewares";

const router = express.Router();
const BASE_ROUTE = "/papers";

router.get("/", asyncHandler(Paper.fetchPapers));

const MODULE = {
    router,
    BASE_ROUTE,
};

export default MODULE;
