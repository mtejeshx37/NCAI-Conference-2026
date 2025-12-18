"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const queries_1 = require("../queries");
const mail_1 = require("../templates/mail");
const getUser = async (req, res) => {
    var _a;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const client = await config_1.db.connect();
    try {
        const userCheck = await client.query(queries_1.User.getUser, [email]);
        if (userCheck.rows.length > 0) {
            return res.status(200).json({
                status: "👍",
                message: "user exists",
                data: userCheck.rows[0],
            });
        }
        return res.status(404).json({
            status: "👎",
            message: "user doesn't exists",
            data: null,
        });
    }
    catch (e) {
        console.error("Error when trying to check if a user exists", e);
        return res.status(500).json({
            status: "👎",
            data: null,
            message: "some error occured when checking for user",
        });
    }
    finally {
        client.release();
    }
};
const isUserFullyRegistered = async (req, res) => {
    var _a;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const client = await config_1.db.connect();
    try {
        const doesUserFullyRegistered = await client.query(queries_1.User.doesUserFullyRegister, [email]);
        if (doesUserFullyRegistered.rows[0].has_null) {
            return res.status(200).json({
                status: "notok",
            });
        }
        else {
            return res.status(200).json({
                status: "ok",
            });
        }
    }
    catch (e) {
        console.error("Error occured when checking whether the user is fully registered", e);
        return res.status(500).json({
            status: "👎",
        });
    }
    finally {
        client.release();
    }
};
const updateUserData = async (req, res) => {
    var _a;
    const { name, phone_no, clg_name } = req.body;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const client = await config_1.db.connect();
    try {
        await client.query(queries_1.User.updateUser, [name, clg_name, phone_no, email]);
        await (0, mail_1.sendRegistrationEmail)(name, email);
        return res.status(200).json({
            status: "👍",
        });
    }
    catch (e) {
        console.error("Error when trying to add a user", e);
        return res.status(500).json({
            status: "👎",
        });
    }
    finally {
        client.release();
    }
};
const login = async (req, res) => {
    const client = await config_1.db.connect();
    try {
        const { token } = req.body;
        const { data: profile } = await axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { email } = profile;
        const checkUserExistence = await client.query(queries_1.User.doesUserExists, [email]);
        if (checkUserExistence.rows.length == 0) {
            await client.query(queries_1.User.addUser, [email]);
        }
        else {
            console.log("User already exists");
        }
        const jwtToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "72h",
        });
        return res.status(200).json({
            status: "👍",
            jwt: jwtToken,
            data: profile,
            message: "successfully logged in",
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            status: "👎",
            jwt: null,
            message: "Error occured when signing in",
        });
    }
};
const UserControllers = {
    getUser,
    updateUserData,
    login,
    isUserFullyRegistered,
};
exports.default = UserControllers;
//# sourceMappingURL=user.js.map