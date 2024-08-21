import { defineConfig, devices } from '@playwright/test';
import { format } from 'date-fns';
import { promiseHooks } from 'v8';

/* const timestamp = format(new Date(), 'MM/dd/yyyy');
const reportDir = `./reporter/playwright-reports-${timestamp}`; */
export default defineConfig({
  //globalTimeout: 450000,
  timeout: 450000,
  expect: {
    timeout: 20000
  },
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 2,
  repeatEach: 0,
  //reporter: [['html', { outputFolder:reportDir,open: 'always' }]],
  reporter: [['html', { open: 'always' }]],
  use: {
    trace: 'off',
    headless: false,
    screenshot: "on",
    video: 'on',
    ignoreHTTPSErrors: true,

    //slowMo:2000,
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chromium'],
        headless: false,
        viewport: null,
        launchOptions: {
          slowMo: 300,
          args: ["--start-maximized"]
        }

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
