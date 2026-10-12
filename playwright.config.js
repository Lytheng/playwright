// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium', // browser_name: ['chromium', 'firefox', 'webkit'],
    headless: false, // GUI or Non-GUI mode
    screenshot: 'on', // 'on', 'off', 'only-on-failure'
    trace: 'on', // 'on', 'off', 'retain-on-failure'
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000
  },
});
module.exports = config;