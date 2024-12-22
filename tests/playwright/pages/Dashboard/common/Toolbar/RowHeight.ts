import BasePage from '../../../Base';
import { ToolbarPage } from './index';

export class RowHeight extends BasePage {
  readonly toolbar: ToolbarPage;

  constructor(toolbar: ToolbarPage) {
    super(toolbar.rootPage);
    this.toolbar = toolbar;
  }

  get() {
    return this.rootPage.locator(`[data-testid="cv-height-menu"]`);
  }

  click({ title }: { title: string }) {
    return this.get().locator(`.cv-row-height-option:has-text("${title}")`).click();
  }
}
