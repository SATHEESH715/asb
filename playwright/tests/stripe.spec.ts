import { test, expect } from '@playwright/test';

test.describe("ASB cases page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(page.getByTestId('page-title')).toHaveText("ASB cases");
  });

  test('lists the three static items', async ({ page }) => {
    await expect(page.locator('[data-testid^="item-row-"]')).toHaveCount(3);
  });

  test('shows the second item', async ({ page }) => {
    const row = page.getByTestId('item-row-22222222-2222-2222-2222-222222222222');
    await expect(row).toContainText("Graffiti report");
    await expect(row).toContainText("Closed");
  });
});
