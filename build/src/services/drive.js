"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const uploadFile = async (file, folderId) => {
    try {
        const keyFilePath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "service_account.json";
        if (process.env.MOCK_DRIVE === 'true') {
            console.log("Mocking Drive Upload for:", file.originalname);
            return { id: "mock_id_" + Date.now(), webViewLink: "http://mock.link" };
        }
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: SCOPES,
        });
        const drive = googleapis_1.google.drive({ version: "v3", auth });
        const fileMetadata = {
            name: file.originalname,
            parents: [folderId],
        };
        const media = {
            mimeType: file.mimetype,
            body: stream_1.Readable.from(file.buffer),
        };
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, webContentLink, webViewLink",
        });
        return response.data;
    }
    catch (error) {
        console.error("Error uploading to Drive:", error);
        if (process.env.MOCK_ON_FAIL === 'true') {
            return { id: "mock_fallback_" + Date.now(), webViewLink: "http://fallback.link" };
        }
        throw error;
    }
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=drive.js.map