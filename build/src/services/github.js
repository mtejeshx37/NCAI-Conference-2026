"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPapers = exports.savePaperToGitHub = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const PAPERS_REPO_PATH = path_1.default.join(__dirname, "../../../Magnus_IEEE_Conference-main");
const PDFS_DIR = path_1.default.join(PAPERS_REPO_PATH, "pdfs");
const PAPERS_JSON_PATH = path_1.default.join(PAPERS_REPO_PATH, "papers.json");
const savePaperToGitHub = async (file, metadata) => {
    try {
        if (!fs_1.default.existsSync(PDFS_DIR)) {
            fs_1.default.mkdirSync(PDFS_DIR, { recursive: true });
        }
        const timestamp = Date.now();
        const sanitizedTitle = metadata.title
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase()
            .substring(0, 50);
        const filename = `${timestamp}_${sanitizedTitle}.pdf`;
        const filePath = path_1.default.join(PDFS_DIR, filename);
        fs_1.default.writeFileSync(filePath, new Uint8Array(file.buffer));
        console.log(`Paper saved to: ${filePath}`);
        const paperId = `paper_${timestamp}`;
        await updatePapersMetadata({
            id: paperId,
            title: metadata.title,
            authors: metadata.authors,
            track: metadata.track,
            submittedAt: new Date().toISOString(),
            filename: filename,
            email: metadata.email,
        });
        if (process.env.AUTO_COMMIT_PAPERS === "true") {
            await commitToGit(filename, metadata.title);
        }
        return {
            success: true,
            paperId,
            filePath: `/pdfs/${filename}`,
        };
    }
    catch (error) {
        console.error("Error saving paper to GitHub:", error);
        throw new Error(`Failed to save paper: ${error.message}`);
    }
};
exports.savePaperToGitHub = savePaperToGitHub;
const updatePapersMetadata = async (paper) => {
    try {
        let papersData = { papers: [] };
        if (fs_1.default.existsSync(PAPERS_JSON_PATH)) {
            const content = fs_1.default.readFileSync(PAPERS_JSON_PATH, "utf-8");
            papersData = JSON.parse(content);
        }
        papersData.papers.push(paper);
        fs_1.default.writeFileSync(PAPERS_JSON_PATH, JSON.stringify(papersData, null, 2), "utf-8");
        console.log(`Updated papers.json with paper ID: ${paper.id}`);
    }
    catch (error) {
        console.error("Error updating papers.json:", error);
        throw error;
    }
};
const commitToGit = async (filename, paperTitle) => {
    try {
        const commands = [
            `cd "${PAPERS_REPO_PATH}"`,
            `git add pdfs/${filename}`,
            `git add papers.json`,
            `git commit -m "Add paper: ${paperTitle}"`,
        ];
        const { stdout, stderr } = await execAsync(commands.join(" && "));
        if (stderr && !stderr.includes("nothing to commit")) {
            console.warn("Git commit warning:", stderr);
        }
        console.log("Git commit output:", stdout);
        if (process.env.AUTO_PUSH_PAPERS === "true") {
            await execAsync(`cd "${PAPERS_REPO_PATH}" && git push`);
            console.log("Changes pushed to remote repository");
        }
    }
    catch (error) {
        console.error("Error committing to git:", error);
        console.warn("Paper saved but git commit failed. Manual commit may be needed.");
    }
};
const getAllPapers = () => {
    try {
        if (!fs_1.default.existsSync(PAPERS_JSON_PATH)) {
            return [];
        }
        const content = fs_1.default.readFileSync(PAPERS_JSON_PATH, "utf-8");
        const papersData = JSON.parse(content);
        return papersData.papers || [];
    }
    catch (error) {
        console.error("Error reading papers:", error);
        return [];
    }
};
exports.getAllPapers = getAllPapers;
//# sourceMappingURL=github.js.map