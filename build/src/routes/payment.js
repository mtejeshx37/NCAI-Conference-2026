"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
const router = express_1.default.Router();
const BASE_ROUTE = "/payment";
router.post("/createOrder", (0, middlewares_1.asyncHandler)(controllers_1.Payment.createOrder));
router.post("/complete", upload.single("manuscript"), (0, middlewares_1.asyncHandler)(controllers_1.Payment.completeRegistration));
router.post("/verify", (0, middlewares_1.asyncHandler)(controllers_1.Payment.verifyPayment));
router.post("/webhook", (0, middlewares_1.asyncHandler)(controllers_1.Payment.webhook));
const MODULE = {
    router,
    BASE_ROUTE,
};
exports.default = MODULE;
//# sourceMappingURL=payment.js.map