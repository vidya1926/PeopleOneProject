// import { test as base, expect } from '@playwright/test';
// import { createJiraIssue, updateJiraIssue } from './jira-integration';
// import { TestInfo } from '@playwright/test';

// let jiraIssueKeys: string[] = [];

// /**
//  * Logs a defect in Jira if the test has failed.
//  * @param testInfo Information about the current test, including its status and details.
//  * @returns A promise that resolves to the key of the created Jira issue, or undefined if the test didn't fail.
//  */
// async function logADefectInJira(testInfo: TestInfo): Promise<string | undefined> {
//     if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
//         const summary = `Test failed: ${testInfo.title}`;
//         const description = `Here is the error: ${testInfo.error?.message}`;
//         const issueKey = await createJiraIssue(summary, description);
//         return issueKey;
//     }
//     return undefined;
// }

// // Define a base test with hooks
// const test = base.extend({
//     async afterEach({}, testInfo) {
//         const issueKey = await logADefectInJira();
//         if (issueKey) {
//             jiraIssueKeys.push(issueKey); // Store the issue key
//         }
//     }
// });

// test.afterAll(async () => {
//     if (jiraIssueKeys.length > 0) {
//         await updateJiraIssue(jiraIssueKeys[0], 'C:/New folder(2)/ExpertusOne/test-results'); // Adjust path as needed
//     } else {
//         console.log('No Jira issues found, skipping attachment upload.');
//     }
// });

// // Export the base test to be used in your spec files
// export { test, expect };
