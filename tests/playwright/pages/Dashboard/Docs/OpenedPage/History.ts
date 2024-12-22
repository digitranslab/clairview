import { expect, Locator } from '@playwright/test';
import { DocsOpenedPagePage } from '.';
import BasePage from '../../../Base';

export class DocsHistoryPage extends BasePage {
  readonly openedPage: DocsOpenedPagePage;

  constructor(openedPage: DocsOpenedPagePage) {
    super(openedPage.rootPage);
    this.openedPage = openedPage;
  }

  get() {
    return this.openedPage.get();
  }

  historyButton() {
    return this.get().getByTestId('cv-doc-page-history-button');
  }

  historyPane() {
    return this.get().getByTestId('cv-doc-page-history-pane');
  }

  historyPaneList() {
    return this.historyPane().getByTestId('cv-doc-page-history-pane-list');
  }

  async clickHistoryButton() {
    return await this.historyButton().click();
  }

  async verifyHistoryOpened({ isOpened }: { isOpened: boolean }) {
    await this.historyPane().waitFor({ state: isOpened ? 'visible' : 'hidden' });
  }

  async verifyHistoryList({
    count,
    items,
  }: {
    count?: number;
    items?: { title: string; index: number; active?: boolean }[] | undefined;
  }) {
    if (count) {
      await expect(this.historyPaneList().locator('.cv-doc-page-history-pane-list-item')).toHaveCount(count);
    }

    if (items) {
      for (const item of items) {
        await expect(this.historyPaneList().locator('.cv-doc-page-history-pane-list-item').nth(item.index)).toHaveText(
          item.title
        );
        if (item.active) {
          await expect(
            this.historyPaneList().locator('.cv-doc-page-history-pane-list-item').nth(item.index)
          ).toHaveAttribute('aria-selected', 'true');
        }
      }
    }
  }

  async clickHistoryItem({ index }: { index: number }) {
    await this.historyPaneList().locator('.cv-doc-page-history-pane-list-item').nth(index).click();
  }

  async clickRestoreButton() {
    await this.get().getByTestId('cv-docs-history-restore-button').click();
  }

  async clickRestoreModalConfirmButton() {
    await this.rootPage.getByTestId('cv-docs-history-confirm-button').click();
  }
}
