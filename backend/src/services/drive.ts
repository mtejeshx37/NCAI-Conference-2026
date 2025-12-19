import { google } from "googleapis";
import { Readable } from "stream";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

export const uploadFile = async (file: Express.Multer.File, folderId: string) => {
    try {
        const keyFilePath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "service_account.json";

        // Check if mock mode (if file doesn't exist or explicit mock env)
        if (process.env.MOCK_DRIVE === 'true') {
            console.log("Mocking Drive Upload for:", file.originalname);
            return { id: "mock_id_" + Date.now(), webViewLink: "http://mock.link" };
        }

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: SCOPES,
        });

        const drive = google.drive({ version: "v3", auth });

        const fileMetadata = {
            name: file.originalname,
            parents: [folderId],
        };

        const media = {
            mimeType: file.mimetype,
            body: Readable.from(file.buffer),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, webContentLink, webViewLink",
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading to Drive:", error);
        // Fallback to mock if auth fails (for local dev without keys)
        if (process.env.MOCK_ON_FAIL === 'true') {
            return { id: "mock_fallback_" + Date.now(), webViewLink: "http://fallback.link" };
        }
        throw error;
    }
};
