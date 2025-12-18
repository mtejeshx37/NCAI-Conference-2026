"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("../config/constants");
const routes_1 = require("./routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("../config");
const app = (0, express_1.default)();
const allowedOrigins = [
    "domain.com",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:6969",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:6969",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
];
const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
};
app.use(credentials);
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(config_1.swaggerSpec));
app.use(routes_1.Home.BASE_ROUTE, routes_1.Home.router);
app.use(routes_1.Mail.BASE_ROUTE, routes_1.Mail.router);
app.use(routes_1.Admin.BASE_ROUTE, routes_1.Admin.router);
app.use(routes_1.Payment.BASE_ROUTE, routes_1.Payment.router);
app.use(routes_1.User.BASE_ROUTE, routes_1.User.router);
app.use(routes_1.Event.BASE_ROUTE, routes_1.Event.router);
app.use(routes_1.Paper.BASE_ROUTE, routes_1.Paper.router);
app.listen(constants_1.PORT, () => {
    console.log(`PORT RUNNING ON ${constants_1.PORT} '_^`);
});
//# sourceMappingURL=index.js.map