import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // @TODO Create the repository
});

test.afterEach(async ({ page }) => {
  // @TODO Delete the repository
});

test("should create an issue", async ({ page }) => {
  // Create the issue journey

  // 1. From the repository page, navigate to the Issues page
  // 2. Click "New issue"
  // 3. Fill in the contents of the issue
  // 4. Create the new issue
});
