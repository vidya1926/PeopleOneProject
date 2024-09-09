import { defineConfig, devices } from '@playwright/test';
import { updateJiraIssue } from './jira/jira-integration';
import { logADefectInJira } from './jira/log-a-defect';

let jiraIssueKeys: string[] = [];
/* const timestamp = format(new Date(), 'MM/dd/yyyy');
const reportDir = `./reporter/playwright-reports-${timestamp}`; */
export default defineConfig({
  //globalTimeout: 450000,
 timeout: 300000,
  expect: {
    timeout: 20000
  },
  testDir: './tests',
  // globalSetup: require.resolve('utils/jiraReport.ts'),
  fullyParallel: false,
  retries: 0,
  workers: 1,
  repeatEach: 0,
  //reporter: [['html', { outputFolder:reportDir,open: 'always' }]],
  reporter: [['html', { open: 'always' }]],
  use: {
    trace: 'on',
    headless: false,
    screenshot: "on",
    video: 'on',
    ignoreHTTPSErrors: true,
    // testMatch: '**/TC001.spec.ts'
    //slowMo:2000,
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chromium'],
        headless: false,
        video: 'on',
        screenshot:"on",
        viewport: null,
        launchOptions: {
          slowMo: 300,
          args: ["--start-maximized"]
        }
        
      }
      
    },
    ...(
      true ? [{
        name: 'Verification',
        testDir: './zCronVerification',
        use: {
          
          headless: false,         
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized"]
          }
        }
      },] : []
    ), ...(
      true ? [{
        name: 'API Testing',
        testDir: './api/apiTestIntegration',

        use: {
          headless: false,
          ...devices['Desktop Chromium'],
          viewport: null,
          launchOptions: {
            slowMo: 300,
            args: ["--start-maximized"]
          }

        }
      },] : []
    ),

    /* {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] ,
        launchOptions: {
          args: ["--kiosk"]
      }},
      } */
  ],



});
