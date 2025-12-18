import { Request, Response } from "express";
import { getAllPapers } from "../services/github";

const fetchPapers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const papers = getAllPapers();
        return res.status(200).json({
            status: "👍",
            data: papers,
            message: "Papers fetched successfully",
        });
    } catch (error: any) {
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

export default PaperControllers;
