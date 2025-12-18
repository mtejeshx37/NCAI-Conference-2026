"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.razorpay = exports.db = exports.ses = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var ses_1 = require("./ses");
Object.defineProperty(exports, "ses", { enumerable: true, get: function () { return __importDefault(ses_1).default; } });
var db_1 = require("./db");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return __importDefault(db_1).default; } });
var razorpay_1 = require("./razorpay");
Object.defineProperty(exports, "razorpay", { enumerable: true, get: function () { return __importDefault(razorpay_1).default; } });
var swagger_1 = require("./swagger");
Object.defineProperty(exports, "swaggerSpec", { enumerable: true, get: function () { return __importDefault(swagger_1).default; } });
//# sourceMappingURL=index.js.map