"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const papers_1 = __importDefault(require("../controllers/papers"));
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
const BASE_ROUTE = "/papers";
router.get("/", (0, middlewares_1.asyncHandler)(papers_1.default.fetchPapers));
const MODULE = {
    router,
    BASE_ROUTE,
};
exports.default = MODULE;
//# sourceMappingURL=papers.js.map