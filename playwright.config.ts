import { defineConfig, devices } from '@playwright/test';

const url = "http://127.0.0.1:3000";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  projects: [
    {
      name: 'API',
      testDir: './PlaywrightTests/API'
    },
    {
      name: 'GUI chrome',
      testDir: './PlaywrightTests/GUI',
      use: { ...devices['Desktop Chrome'] },

    }//,
    // {
    //   name: 'GUI chromium',
    //   testDir: './PlaywrightTests/GUI',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'GUI firefox',
    //   testDir: './PlaywrightTests/GUI',
    //   use: { ...devices['Desktop Firefox'] },
    // }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: url,
    //baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: url,
    reuseExistingServer: !process.env.CI,
  },
});
