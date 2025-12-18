"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
const BASE_ROUTE = "/user";
router.get("/get", middlewares_1.authenticateJWT, (0, middlewares_1.asyncHandler)(controllers_1.User.getUser));
router.get("/userFullyRegistered", middlewares_1.authenticateJWT, (0, middlewares_1.asyncHandler)(controllers_1.User.isUserFullyRegistered));
router.post("/updateUser", middlewares_1.authenticateJWT, (0, middlewares_1.asyncHandler)(controllers_1.User.updateUserData));
router.post("/login", (0, middlewares_1.asyncHandler)(controllers_1.User.login));
const MODULE = {
    router,
    BASE_ROUTE,
};
exports.default = MODULE;
//# sourceMappingURL=user.js.map