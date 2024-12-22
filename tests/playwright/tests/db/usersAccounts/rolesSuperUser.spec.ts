import { test } from '@playwright/test';
import { DashboardPage } from '../../../pages/Dashboard';
import setup, { unsetup } from '../../../setup';

test.describe.skip('Super user', () => {
  let dashboard: DashboardPage;
  let context: any;

  test.beforeEach(async ({ page }) => {
    context = await setup({ page, isEmptyProject: true, isSuperUser: true });
    dashboard = new DashboardPage(page, context.base);
  });

  test.afterEach(async () => {
    await unsetup(context);
  });

  // fix me!
  test('AppStore access', async () => {
    await dashboard.closeTab({ title: 'Team & Auth' });

    await dashboard.rootPage.goto('/#/account/apps');
    await dashboard.rootPage.waitForLoadState('load');
    const appPage = await dashboard.rootPage;

    // Access slack card
    const card = await appPage.locator('.cv-app-store-card-Slack');
    await card.click();
    await card.locator('.cv-app-store-card-install').click();

    // Configure slack
    let slackModal = await appPage.locator('.cv-modal-plugin-install');
    await slackModal.locator('[placeholder="Channel Name"]').fill('Test Channel');
    await slackModal.locator('[placeholder="Webhook URL"]').fill('http://test.com');
    await slackModal.locator('button:has-text("Save")').click();
    await dashboard.verifyToast({ message: 'Successfully installed' });

    // Modify configuration
    await card.click();
    await card.locator('.cv-app-store-card-edit').click();
    slackModal = appPage.locator('.cv-modal-plugin-install');
    await slackModal.locator('[placeholder="Channel Name"]').fill('Test Channel 2');
    await slackModal.locator('[placeholder="Webhook URL"]').fill('http://test2.com');
    await slackModal.locator('button:has-text("Save")').click();
    await dashboard.verifyToast({ message: 'Successfully installed' });

    // Uninstall
    await card.click();
    await card.locator('.cv-app-store-card-reset').click();
    slackModal = appPage.locator('.cv-modal-plugin-uninstall');
    await slackModal.locator('button:has-text("Confirm")').click();
    await dashboard.verifyToast({ message: 'Plugin uninstalled successfully' });
  });
});
