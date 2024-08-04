import { defineConfig, devices } from '@playwright/test';
import { format } from 'date-fns';

/* const timestamp = format(new Date(), 'MM/dd/yyyy');
const reportDir = `./reporter/playwright-reports-${timestamp}`; */
export default defineConfig({

  timeout: 450000,
  expect: {
    timeout: 20000
  },
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
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
      name: 'TC089',
      use: {
        ...devices['Desktop Chromium'],
        viewport: null,
        launchOptions: {
          slowMo: 300,
          args: ["--start-maximized"]
        }
      
      }
    },

    /* {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] ,
        launchOptions: {
          args: ["--kiosk"]
      }},
      } */
  ],
});
