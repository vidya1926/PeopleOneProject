import { defineConfig, devices } from '@playwright/test';


let jiraIssueKeys: string[] = [];
const timestamp = Date.now();
const reportDir = `./reporter/-playwright-reports}`;

export default defineConfig({
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

  //reporter: [['html', { outputFolder: reportDir, open: 'always' }]],
   reporter: [['html', { open: 'always' }]],
  use: {
    actionTimeout: 20000,
    trace: 'on',
    headless: false,
    screenshot: "on",
    video: 'on',
    ignoreHTTPSErrors: true,
    bypassCSP:true,

  },

  // testMatch: [
  //   '*/tests/admin/adminGroups_CustomerAdminGroupUserCreation/**/*.spec.ts',
  //   '*/tests/admin/adminGroups2/**/*.spec.ts',
  //   '*/tests/admin/customrolecreation/**/*.spec.ts',
  //   '*/tests/admin/metadataLibrary/**/*.spec.ts',
  //   '*/tests/admin/location/**/*.spec.ts',
  //   '*/tests/content/content/**/*.spec.ts',
  //   '*/tests/admin/completionCertificate/**/*.spec.ts',
  //   '*/tests/admin/assessment/**/*.spec.ts',
  //   '*/tests/admin/survey/**/*.spec.ts',
  //   '*/tests/content/content/**/*.spec.ts',
  //   '*/tests/admin/peoplemodule_user/**/*.spec.ts',
  //   '*/tests/admin/quickaccess/**/*.spec.ts',
  //   '*/tests/admin/communication/**/*.spec.ts',
  //   '*/tests/admin/learnerGroup/**/*.spec.ts',
  //   '*/tests/admin/announcement/**/*.spec.ts',
  //   '*/tests/admin/course/**/*.spec.ts',
  //   '*/tests/admin/certification/**/*.spec.ts',
  //   '*/tests/admin/managerApproval/**/*.spec.ts',

  // ],

  projects: [
    {
      name: 'Chromium',

      use: {
        ...devices['Desktop Chromium'],
        ignoreHTTPSErrors: true,
        headless: false,
        video: 'on',
        screenshot: "on",
        viewport: null,
        launchOptions: {
          slowMo: 300,
          args: ["--start-maximized"]
        },
      

      }

    },
    ...(
      false ? [{
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
      false ? [{
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
  ],



});
