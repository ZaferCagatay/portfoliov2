import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e", fullyParallel: true, workers: 4,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100", browserName: "chromium", trace: "retain-on-failure", launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: process.env.SONAR_TEST_DEV ? "npm run dev -- --hostname 127.0.0.1 --port 3100" : "npm run start -- --hostname 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI },
});
