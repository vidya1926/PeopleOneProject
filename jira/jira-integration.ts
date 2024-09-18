import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

// Jira API URL and credentials
const url = "https://vidya-bharathi.atlassian.net/rest/api/2/issue/";
const username = "vidyar1926@gmail.com";
const apiKey = "ATATT3xFfGF0EF4UI4Y_kjqnMGvmkx_wA5w3oz1VlCOqC9sdcKMvAk_Xi5pj1PjUO1GSoAPiPmcic6y1xWuUCp_lflscZD0FsW4gxOE354Neic48Ah_VWRJpTLPQDujkdnWdUpxDzH7H7k6EEVUYHAQO3ZDCwJNZQeNc41xDHxr-NnoaYKLLHNE=57CA301F";
const projectId = "EONPW";
const BATCH_SIZE = 5; // Number of files to upload in each batch

/**
 * Creates a Jira issue with the given summary and description.
 * @param summary The summary or title of the Jira issue.
 * @param description The description or details of the Jira issue.
 * @returns A promise that resolves to the key of the created Jira issue.
 */
async function createJiraIssue(summary: string, description: string): Promise<string> {
    const issueRequestJson = {
        "fields": {
            "project": { "key": projectId },
            "summary": summary,
            "description": description,
            "issuetype": { "name": "Bug" }
        }
    };

    // Send a POST request to create the Jira issue
    const response = await axios.post(url, issueRequestJson, {
        auth: { username: username, password: apiKey },
        headers: { 'Content-Type': 'application/json' }
    });

    console.log("The API request is successful");
    return response.data.key; // Return the issue key
}

/**
 * Recursively collects all files in a directory and its subdirectories.
 * @param dir The directory to search for files.
 * @param fileList The list of files collected.
 * @returns The list of files.
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
    try {
        const stats = fs.statSync(dir);
        if (!stats.isDirectory()) {
            console.error(`Path is not a directory: ${dir}`);
            return fileList;
        }

        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                fileList.push(filePath);
            } else if (stats.isDirectory()) {
                getAllFiles(filePath, fileList);
            }
        });
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
    }
    return fileList;
}

/**
 * Uploads a batch of files as attachments to a Jira issue.
 * @param issueKey The key of the Jira issue to update.
 * @param files The files to upload.
 */
async function uploadBatch(issueKey: string, files: string[]) {
    const formData = new FormData();
    files.forEach((filePath) => {
        console.log(`Appending file: ${filePath}`);
        formData.append('file', fs.createReadStream(filePath), { filename: path.basename(filePath) });
    });

    try {
        console.log(`Uploading batch to: ${url}${issueKey}/attachments`);
        // Send a POST request to upload the attachments
        const response = await axios.post(`${url}${issueKey}/attachments`, formData, {
            auth: {
                username: username,
                password: apiKey
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Atlassian-Token': 'no-check'
            },
            timeout: 120000 // Set timeout to 120 seconds
        });

        console.log('Batch uploaded successfully');
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Batch upload failed:', error.response.data);
        } else {
            console.error('Batch upload failed:', error.message);
        }
    }
}

/**
 * Updates a Jira issue by uploading attachments from the specified folder.
 * @param issueKey The key of the Jira issue to update.
 * @param folderPath The path to the folder containing files to attach.
 */
async function updateJiraIssue(issueKey: string, folderPath: string) {
    console.log(`Current working directory: ${process.cwd()}`);
    const absoluteFolderPath = path.resolve(folderPath); // Resolve the absolute path of the folder

    console.log(`Absolute path of folderPath: ${absoluteFolderPath}`);
    
    // Get all files in the specified folder and subdirectories
    const files =getAllFiles(absoluteFolderPath);
    console.log(`Files to be uploaded: ${files}`);
    // Upload files in batches
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        console.log(batch)
        await uploadBatch(issueKey, batch);
    }
}

export { createJiraIssue, updateJiraIssue };
