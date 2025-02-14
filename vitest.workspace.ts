import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      include: ["src/**/*.node.{test,spec}.ts"],
      name: "server",
      environment: "node",
    },
  },
  {
    test: {
      include: ["src/**/*.browser.{test,spec}.ts"],
      name: "browser",
      browser: {
        headless: true,
        enabled: true,
        provider: "playwright",
        instances: [
          { browser: "chromium" },
          { browser: "firefox" },
          { browser: "webkit" },
        ],
      },
    },
  },
]);
