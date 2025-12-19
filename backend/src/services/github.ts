import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const PAPERS_REPO_PATH = path.join(__dirname, "../../../Magnus_IEEE_Conference-main");
const PDFS_DIR = path.join(PAPERS_REPO_PATH, "pdfs");
const PAPERS_JSON_PATH = path.join(PAPERS_REPO_PATH, "papers.json");

interface PaperMetadata {
    id: string;
    title: string;
    authors: string[];
    track: string;
    submittedAt: string;
    filename: string;
    email: string;
}

interface PapersData {
    papers: PaperMetadata[];
}

/**
 * Save uploaded paper to GitHub repository
 */
export const savePaperToGitHub = async (
    file: Express.Multer.File,
    metadata: {
        title: string;
        authors: string[];
        track: string;
        email: string;
    }
): Promise<{ success: boolean; paperId: string; filePath: string }> => {
    try {
        // Ensure directories exist
        if (!fs.existsSync(PDFS_DIR)) {
            fs.mkdirSync(PDFS_DIR, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedTitle = metadata.title
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase()
            .substring(0, 50);
        const filename = `${timestamp}_${sanitizedTitle}.pdf`;
        const filePath = path.join(PDFS_DIR, filename);

        // Save file to disk
        fs.writeFileSync(filePath, new Uint8Array(file.buffer));
        console.log(`Paper saved to: ${filePath}`);

        // Update papers.json
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

        // Optionally commit to git (if AUTO_COMMIT is enabled)
        if (process.env.AUTO_COMMIT_PAPERS === "true") {
            await commitToGit(filename, metadata.title);
        }

        return {
            success: true,
            paperId,
            filePath: `/pdfs/${filename}`,
        };
    } catch (error: any) {
        console.error("Error saving paper to GitHub:", error);
        throw new Error(`Failed to save paper: ${error.message}`);
    }
};

/**
 * Update papers.json with new paper metadata
 */
const updatePapersMetadata = async (paper: PaperMetadata): Promise<void> => {
    try {
        let papersData: PapersData = { papers: [] };

        // Read existing papers.json
        if (fs.existsSync(PAPERS_JSON_PATH)) {
            const content = fs.readFileSync(PAPERS_JSON_PATH, "utf-8");
            papersData = JSON.parse(content);
        }

        // Add new paper
        papersData.papers.push(paper);

        // Write updated data
        fs.writeFileSync(
            PAPERS_JSON_PATH,
            JSON.stringify(papersData, null, 2),
            "utf-8"
        );

        console.log(`Updated papers.json with paper ID: ${paper.id}`);
    } catch (error) {
        console.error("Error updating papers.json:", error);
        throw error;
    }
};

/**
 * Commit changes to git repository
 */
const commitToGit = async (
    filename: string,
    paperTitle: string
): Promise<void> => {
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

        // Optionally push (if AUTO_PUSH is enabled)
        if (process.env.AUTO_PUSH_PAPERS === "true") {
            await execAsync(`cd "${PAPERS_REPO_PATH}" && git push`);
            console.log("Changes pushed to remote repository");
        }
    } catch (error: any) {
        console.error("Error committing to git:", error);
        // Don't throw - we still want the paper saved even if git fails
        console.warn("Paper saved but git commit failed. Manual commit may be needed.");
    }
};

/**
 * Get all papers from papers.json
 */
export const getAllPapers = (): PaperMetadata[] => {
    try {
        if (!fs.existsSync(PAPERS_JSON_PATH)) {
            return [];
        }

        const content = fs.readFileSync(PAPERS_JSON_PATH, "utf-8");
        const papersData: PapersData = JSON.parse(content);
        return papersData.papers || [];
    } catch (error) {
        console.error("Error reading papers:", error);
        return [];
    }
};
