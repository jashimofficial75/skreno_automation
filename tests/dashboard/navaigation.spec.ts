import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPages';

const menuItems = [
  { name: 'Requests',     url: /\/dashboard\/requests/ },
  { name: 'Testimonials', url: /\/dashboard\/testimonials/ },
  { name: 'Meetings',     url: /\/dashboard\/meetings/ },
  { name: 'Guides',       url: /\/dashboard\/guides/ },
  { name: 'Team',         url: /\/dashboard\/team/ },
  { name: 'Billing',      url: /\/dashboard\/billing/ },
  { name: 'Integrations', url: /\/dashboard\/integrations/ },
  { name: 'Settings',     url: /\/dashboard\/settings/ },
];

test.describe('Dashboard sidebar', () => {
  test('dashboard opens when already logged in', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboard.sidebar).toBeVisible();
  });

  for (const item of menuItems) {
    test(`sidebar "${item.name}" opens correct page`, async ({ page }) => {
      const dashboard = new DashboardPage(page);
      await dashboard.goto();
      await dashboard.sidebarLink(item.name).click();
      await expect(page).toHaveURL(item.url);
    });
  }
});
