import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './.',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  testMatch: '**/*.test.ts',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://automationexercise.com/',
    headless: false,
    actionTimeout: 30000,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  reportSlowTests: {
    max: 1000,
    threshold: 300
  },
  expect: {
    timeout: 60*1000,
  },
  reporter: [['list'], ['line']],
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'Api automation',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/ApiAutomationwithUi',
    }]
});
