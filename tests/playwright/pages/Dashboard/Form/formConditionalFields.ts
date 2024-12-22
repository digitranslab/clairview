import { getTextExcludeIconText } from '../../../tests/utils/general';
import BasePage from '../../Base';
import { FormPage } from './index';
import { expect } from '@playwright/test';

export class FormConditionalFieldsPage extends BasePage {
  readonly parent: FormPage;

  constructor(parent: FormPage) {
    super(parent.rootPage);
    this.parent = parent;
  }

  get() {
    return this.rootPage.getByTestId('cv-form-field-visibility-btn');
  }

  async click() {
    await this.get().waitFor({ state: 'visible' });
    await this.get().click();
    await this.rootPage.getByTestId('cv-filter-menu').waitFor({ state: 'visible' });
  }

  async verify({ isDisabled, count, isVisible }: { isDisabled: boolean; count?: string; isVisible?: boolean }) {
    const conditionalFieldBtn = this.get();

    await conditionalFieldBtn.waitFor({ state: 'visible' });

    if (isDisabled) {
      await expect(conditionalFieldBtn).toHaveClass(/cv-disabled/);
    } else {
      await expect(conditionalFieldBtn).not.toHaveClass(/cv-disabled/);
    }

    if (count !== undefined) {
      const conditionCount = await getTextExcludeIconText(conditionalFieldBtn);

      await expect(conditionCount).toContain(count);
    }

    if (isVisible !== undefined) {
      if (isVisible) {
      }
    }
  }

  async verifyVisibility({ title, isVisible }: { title: string; isVisible: boolean }) {
    const field = this.parent.get().locator(`[data-testid="cv-form-fields"][data-title="${title}"]`);
    await field.scrollIntoViewIfNeeded();

    // Wait for icon change transition complete
    await this.rootPage.waitForTimeout(300);

    if (isVisible) {
      await expect(field.locator('.cv-field-visibility-icon')).toHaveClass(/cv-field-visible/);
    } else {
      await expect(field.locator('.cv-field-visibility-icon')).not.toHaveClass(/cv-field-visible/);
    }
  }
}
