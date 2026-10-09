import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.getByRole('navigation');
    this.userMenu = page.getByRole('banner').getByRole('button', { name: 'Jashim' });
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  sidebarLink(name: string): Locator {
    return this.sidebar.getByRole('link', { name, exact: true });
  }
}
