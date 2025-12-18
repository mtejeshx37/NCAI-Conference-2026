"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No Authorization header" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(err);
        if (err || !decoded) {
            return res.status(401).json({ message: "Forbidden: Invalid token" });
        }
        req.user = { email: decoded.email };
        next();
    });
};
exports.default = authenticateJWT;
//# sourceMappingURL=authenticateJWT.js.map