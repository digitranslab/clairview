import BasePage from '../../../Base';
import { ToolbarPage } from './index';

export class ToolbarAddEditStackPage extends BasePage {
  readonly toolbar: ToolbarPage;

  constructor(toolbar: ToolbarPage) {
    super(toolbar.rootPage);
    this.toolbar = toolbar;
  }

  get() {
    return this.rootPage.locator(`.cv-dropdown-kanban-stacked-by-menu`);
  }

  async addOption({ title }: { title: string }) {
    await this.get().getByTestId('cv-add-select-option-btn').click();
    await this.get().locator(`.cv-select-option >> input`).last().fill(title);
    await this.get().locator(`[type="submit"]`).click();
    await this.verifyToast({ message: 'Column updated' });
  }
}
