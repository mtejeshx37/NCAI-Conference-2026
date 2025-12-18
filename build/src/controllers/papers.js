"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("../services/github");
const fetchPapers = async (_req, res) => {
    try {
        const papers = (0, github_1.getAllPapers)();
        return res.status(200).json({
            status: "👍",
            data: papers,
            message: "Papers fetched successfully",
        });
    }
    catch (error) {
        console.error("Error fetching papers:", error);
        return res.status(500).json({
            status: "👎",
            data: null,
            message: "Error fetching papers",
            error: error.message,
        });
    }
};
const PaperControllers = {
    fetchPapers,
};
exports.default = PaperControllers;
//# sourceMappingURL=papers.js.map