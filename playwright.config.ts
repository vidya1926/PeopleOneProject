import { defineConfig, devices } from '@playwright/test';
import { format } from 'date-fns';

const timestamp = format(new Date(), 'yyyy/MM/dd');
const reportDir = `./reporter/playwright-reports-${timestamp}`;
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
  reporter: [['html', { outputFolder:reportDir,open: 'always' }]],
  use: {
    trace: 'on',
    headless: false,
    screenshot: "on",
    video: 'off',
    ignoreHTTPSErrors: true,

    //slowMo:2000,
  },
  projects: [
    {
      name: 'chromium',
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
