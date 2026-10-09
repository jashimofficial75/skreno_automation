import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';
const ONE_HOUR = 60 * 60 * 1000;

setup('authenticate', async ({ page }) => {
  const isFresh =
    fs.existsSync(authFile) && Date.now() - fs.statSync(authFile).mtimeMs < ONE_HOUR;
  setup.skip(isFresh, 'Saved session is still fresh, skipping login');

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
  await expect(page).toHaveURL(/dashboard/);
  await page.context().storageState({ path: authFile });
});
