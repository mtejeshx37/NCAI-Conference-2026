"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const constants_1 = require("./constants");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Magnus Backend",
            version: "1.0.0",
            description: "API documentation for my Magnus Backend",
        },
        servers: [
            {
                url: `http://localhost:${constants_1.PORT}`,
                description: "Local server",
            },
        ],
    },
    apis: ["./src/routes/**/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map