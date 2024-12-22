import { expect } from '@playwright/test';
import BasePage from '../../Base';
import { FormPage } from '../Form';
import { GalleryPage } from '../Gallery';
import { GridPage } from '../Grid';
import { KanbanPage } from '../Kanban';

export class QrCodeOverlay extends BasePage {
  constructor(parent: GridPage | GalleryPage | KanbanPage | FormPage) {
    super(parent.rootPage);
  }

  get() {
    return this.rootPage.locator(`.cv-qr-code-large`);
  }

  async verifyQrValueLabel(expectedValue: string) {
    const foundQrValueLabelText = await this.get()
      .locator('[data-testid="cv-qr-code-large-value-label"]')
      .textContent();
    expect(foundQrValueLabelText).toContain(expectedValue);
  }

  async clickCloseButton() {
    await this.get().locator('.ant-modal-close-x').click();
  }
}
