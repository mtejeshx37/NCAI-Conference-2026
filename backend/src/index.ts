import "dotenv/config";

import express from "express";
import cors from "cors";
import { PORT } from "../config/constants";
import { Home, Admin, Mail, Payment, User, Event, Paper } from "./routes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config";
import { CorsOptions } from "cors";
import { NextFunction, Request, Response } from "express";

const app = express();

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

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
};

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(Home.BASE_ROUTE, Home.router);
app.use(Mail.BASE_ROUTE, Mail.router);
app.use(Admin.BASE_ROUTE, Admin.router);
app.use(Payment.BASE_ROUTE, Payment.router);
app.use(User.BASE_ROUTE, User.router);
app.use(Event.BASE_ROUTE, Event.router);
app.use(Paper.BASE_ROUTE, Paper.router);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`PORT RUNNING ON ${PORT} '_^`);
  });
}

export default app;
