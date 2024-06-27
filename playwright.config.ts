import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 100000,
  expect: {
    timeout: 20000
  },
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  repeatEach:10,
  reporter: [['html',{open:'always'}],],
  use: {   
    trace: 'on',
    headless:false,
    screenshot:"on",
    video:'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chromium'] ,
      viewport: null,
      launchOptions: {
        args: ["--start-maximized"]
        } 
       }
      },
  ],
});
