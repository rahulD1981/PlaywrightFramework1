import { defineConfig, devices } from '@playwright/test';
import { on } from 'cluster';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL = process.env.URL || 'https://www.GOOGLE.com';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 2,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: false,
  reporter: [['list'], 
            ['html', { open: 'never' }],
          ['allure-playwright', 
            {
              detail : true,
              suiteTitle : true,
              environmentInfo : {
                name: "TEST",
                appName : "CURA",
                Release : "Release 1",
                node_version : process.version
              },
            }]
        ],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    */
  ],
});
